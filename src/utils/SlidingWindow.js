export function updateSlidingWindow(prevData, newData, windowSize = 30) {
  const merged = [...prevData, ...newData];

  // ambil N data terakhir
  return merged.slice(-windowSize);
}
