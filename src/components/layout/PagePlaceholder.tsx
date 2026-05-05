interface PlaceholderProps {
  route: string;
}

const PagePlaceholder = ({ route }: PlaceholderProps) => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5 lg:px-10">
      <p className="font-display text-lg text-text-secondary">Page: {route}</p>
    </div>
  );
};

export default PagePlaceholder;
