import { Link } from "@/lib/router-compat";

export const HONEYPOT_NAME = "website_url";

/** Champ piège invisible pour les robots. */
export function Honeypot() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Ne pas remplir
        <input type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function isHoneypotFilled(form: EventTarget | null | undefined): boolean {
  if (!form || !(form instanceof HTMLFormElement)) return false;
  const el = form.elements.namedItem(HONEYPOT_NAME);
  return el instanceof HTMLInputElement && el.value.trim() !== "";
}

export function PrivacyNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[11px] leading-relaxed text-text-muted ${className}`}>
      Corse Drone utilise ces informations uniquement pour répondre à votre demande. Conservation : 3 ans. Vos droits :{" "}
      <Link to="/politique-confidentialite" className="underline hover:opacity-80 transition-opacity">
        politique de confidentialité
      </Link>
    </p>
  );
}
