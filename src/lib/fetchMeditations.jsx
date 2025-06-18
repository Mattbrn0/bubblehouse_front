// lib/fetchMeditations.js
export async function fetchMeditations() {
  const res = await fetch('/api/meditations');
  return res.json();
}
