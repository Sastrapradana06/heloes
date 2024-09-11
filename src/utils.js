export function formatDate(dateString) {
  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const date = new Date(dateString);
  const hari = date.getDate();
  const bulanNama = bulan[date.getMonth()]; // Ambil nama bulan yang disingkat
  const tahun = date.getFullYear();

  return `${hari} ${bulanNama} ${tahun}`;
}
