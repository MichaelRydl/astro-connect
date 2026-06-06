export default function ErrorNote({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) {
  return (
    <p
      role="status"
      className={`rounded-xl border border-stroke bg-white px-4 py-3 text-xs text-muted ${className}`}
    >
      {message}
    </p>
  );
}
