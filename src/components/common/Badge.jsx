export default function Badge({ status }) {
  const isSubmitted = status === "submitted";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isSubmitted ? "bg-good-100 text-good-600" : "bg-bad-100 text-bad-600"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isSubmitted ? "bg-good-600" : "bg-bad-600"}`} />
      {isSubmitted ? "Submitted" : "Not submitted"}
    </span>
  );
}
