/**
 * Router-compat shim — bridges react-router-dom v6 call sites to
 * @tanstack/react-router without hand-rewriting every component.
 */
import {
  useNavigate as tsNavigate,
  useLocation as tsLocation,
  useParams as tsParams,
  useRouter,
  useRouterState,
  Link as TSLink,
  Navigate as TSNavigate,
  Outlet as TSOutlet,
} from "@tanstack/react-router";
import {
  useMemo,
  useCallback,
  forwardRef,
  type CSSProperties,
  type ComponentProps,
  type ReactNode,
} from "react";

// ---------- shared URL parsing ----------

function parseTo(to: string): {
  pathname: string;
  search?: Record<string, string> | undefined;
  hash?: string | undefined;
} {
  const [beforeHash = "", hashStr] = (to ?? "").split("#");
  const [pathname, searchStr] = beforeHash.split("?");
  return {
    // react-router keeps the current path for search-only ("?a=1") and
    // hash-only ("#section") targets; TanStack's "." means current route.
    pathname: pathname || ".",
    search: searchStr ? Object.fromEntries(new URLSearchParams(searchStr)) : undefined,
    hash: hashStr || undefined,
  };
}

// ---------- useNavigate ----------

type NavigateOptions = { replace?: boolean; state?: unknown };

type NavigateFn = {
  (to: string | number, options?: NavigateOptions): void;
  (delta: number): void;
};

export function useNavigate(): NavigateFn {
  const tsNav = tsNavigate();
  const router = useRouter();
  return useCallback((to: string | number, options?: NavigateOptions) => {
    if (typeof to === "number") {
      router.history.go(to);
      return;
    }
    const { pathname, search, hash } = parseTo(to);
    const navOptions: Record<string, unknown> = {
      to: pathname,
      search: search as never,
      state: options?.state as never,
    };
    if (hash !== undefined) navOptions["hash"] = hash;
    if (options?.replace !== undefined) navOptions["replace"] = options.replace;
    tsNav(navOptions as never);
  }, [tsNav, router]) as NavigateFn;
}

// ---------- useLocation ----------

export function useLocation() {
  const loc = tsLocation();
  return useMemo(
    () => ({
      pathname: loc.pathname,
      search: loc.searchStr ? `?${loc.searchStr}` : "",
      hash: loc.hash ?? "",
      state: (loc.state ?? null) as unknown,
      key: loc.pathname + (loc.searchStr ?? ""),
    }),
    [loc.pathname, loc.searchStr, loc.hash, loc.state],
  );
}

// ---------- useParams ----------

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>(): T {
  return tsParams({ strict: false } as never) as T;
}

// ---------- useSearchParams (react-router compat) ----------

export function useSearchParams(): [URLSearchParams, (init: URLSearchParams | Record<string, string> | ((prev: URLSearchParams) => URLSearchParams), opts?: { replace?: boolean }) => void] {
  const loc = tsLocation();
  const nav = tsNavigate();
  const router = useRouter();
  const params = useMemo(() => new URLSearchParams(loc.searchStr ?? ""), [loc.searchStr]);
  const setParams = useCallback(
    (
      init: URLSearchParams | Record<string, string> | ((prev: URLSearchParams) => URLSearchParams),
      opts?: { replace?: boolean },
    ) => {
      // Functional updaters read the router's live location, not the render
      // snapshot — react-router passes call-time params, and chained updates
      // within one tick must see each other's writes.
      const live = router.state.location;
      const current = new URLSearchParams(live.searchStr ?? "");
      const next =
        typeof init === "function"
          ? init(current)
          : init instanceof URLSearchParams
            ? init
            : new URLSearchParams(init);
      const searchObj: Record<string, string> = {};
      next.forEach((v, k) => { searchObj[k] = v; });
      const navOptions: Record<string, unknown> = {
        to: live.pathname,
        search: searchObj as never,
      };
      if (opts?.replace !== undefined) navOptions["replace"] = opts.replace;
      nav(navOptions as never);
    },
    [nav, router],
  );
  return [params, setParams];
}

// ---------- Link ----------

type LinkProps = Omit<ComponentProps<typeof TSLink>, "to"> & {
  to: string;
  replace?: boolean;
  state?: unknown;
  children?: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, replace, state, children, ...rest },
  ref,
) {
  const { pathname, search, hash } = parseTo(to);
  const linkProps: Record<string, unknown> = {
    to: pathname,
    search: search as never,
    state: state as never,
  };
  if (hash !== undefined) linkProps["hash"] = hash;
  if (replace !== undefined) linkProps["replace"] = replace;
  return (
    <TSLink
      ref={ref as never}
      {...(linkProps as Record<string, unknown>)}
      {...((rest ?? {}) as Record<string, unknown>)}
    >
      {children}
    </TSLink>
  );
});

// ---------- Navigate ----------

export function Navigate({ to, replace, state }: { to: string; replace?: boolean; state?: unknown }) {
  const { pathname, search, hash } = parseTo(to);
  const navProps: Record<string, unknown> = {
    to: pathname,
    search: search as never,
    state: state as never,
  };
  if (hash !== undefined) navProps["hash"] = hash;
  if (replace !== undefined) navProps["replace"] = replace;
  return <TSNavigate {...(navProps as Record<string, unknown>)} />;
}

// ---------- Outlet ----------

export const Outlet = TSOutlet;

// ---------- NavLink ----------

type NavLinkRenderState = { isActive: boolean; isPending: boolean };

export interface NavLinkProps extends Omit<LinkProps, "className" | "style"> {
  className?: string | ((state: NavLinkRenderState) => string);
  style?: CSSProperties | ((state: NavLinkRenderState) => CSSProperties);
  end?: boolean;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { to, className, style, end, ...rest },
  ref,
) {
  const { pathname } = parseTo(to);
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const targetPath = pathname === "." ? currentPath : pathname;
  const isActive = end
    ? currentPath === targetPath
    : currentPath === targetPath ||
      (targetPath !== "/" && currentPath.startsWith(`${targetPath}/`));
  const state: NavLinkRenderState = { isActive, isPending: false };
  const resolvedClassName =
    typeof className === "function" ? className(state) : className;
  const resolvedStyle = typeof style === "function" ? style(state) : style;
  return (
    <Link ref={ref} to={to} className={resolvedClassName} style={resolvedStyle} {...rest} />
  );
});
