export default async function handler(req, res) {
  try {
    const response = await fetch(
      "http://0.0.0.0:8055/Items/brand?sort=sort,-date_created&fields=*,Contents.*.*,Collab_Creators.*.*,Categories.*.*&filter=%7B%22status%22:%7B%22_eq%22:%22published%22%7D%7D"
    );
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    const data = await response.json();
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
