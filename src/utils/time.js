export function toDate(ts) {
  return new Date(ts);
}

export function formatTime(ts) {
  return toDate(ts).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatDate(ts) {
  return toDate(ts).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
