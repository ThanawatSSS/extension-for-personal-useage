document.getElementById("fetch").addEventListener("click", fetchInventory);

async function fetchInventory() {
  const steamId = "**************"; // ใส่ Steam ID ของผู้ใช้
  const apiKey = "***********************"; // ใส่ API Key ของ Steam
  const inventoryContainer = document.getElementById("inventory");
  inventoryContainer.innerHTML = "Loading...";

  try {
    // API ดึง inventory ของ Steam
    const response = await fetch(
      `https://api.steampowered.com/IEconItems_730/GetPlayerItems/v0001/?key=${apiKey}&steamid=${steamId}`
    );

    if (!response.ok) throw new Error("Failed to fetch inventory");

    const data = await response.json();
    const items = data.result.items;

    inventoryContainer.innerHTML = "";
    for (const item of items) {
      const itemName = item.name;
      const price = await fetchPriceFromMarket(itemName); // ฟังก์ชันดึงราคาจากตลาด

      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `<span>${itemName}</span><span>${price} USD</span>`;
      inventoryContainer.appendChild(itemDiv);
    }
  } catch (error) {
    console.error(error);
    inventoryContainer.innerHTML = "Error fetching inventory.";
  }
}

// ฟังก์ชันดึงราคาจาก Steam Market
async function fetchPriceFromMarket(itemName) {
  try {
    const response = await fetch(
      `https://steamcommunity.com/market/priceoverview/?currency=1&appid=730&market_hash_name=${encodeURIComponent(
        itemName
      )}`
    );
    const priceData = await response.json();
    return priceData.lowest_price || "N/A";
  } catch {
    return "N/A";
  }
}
