export async function getAdresse(adresse) {
  try {
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${adresse}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
