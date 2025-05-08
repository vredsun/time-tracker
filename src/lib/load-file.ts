export const downloadFile = (blob: Blob) => {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "time_tracker.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}