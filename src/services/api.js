export const fetchHello = async () => {
  try {
    const response = await fetch('http://localhost:5173/api/hello');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};
