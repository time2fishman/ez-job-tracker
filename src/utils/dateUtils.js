export default function formatDate(dateString) {
  if (!dateString) return "N/A"; // Handle missing dates
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
  const day = String(date.getUTCDate()).padStart(2, "0"); // Add leading zero
  const year = date.getFullYear();
  return `${month}/${day}/${year}`; // Format: MM/DD/YYYY
}
