let inventory = [];
let totalSales = 0;

function addProduct() {
  const name = document.getElementById("productName").value;
  const qty = parseInt(document.getElementById("productQty").value);
  const price = parseFloat(document.getElementById("productPrice").value);

  if (!name || qty <= 0 || price <= 0) {
    alert("Please enter valid product details!");
    return;
  }

  const product = { name, qty, price };
  inventory.push(product);
  updateTable();

  // Clear input fields
  document.getElementById("productName").value = "";
  document.getElementById("productQty").value = "";
  document.getElementById("productPrice").value = "";
}

function updateTable() {
  const tbody = document.querySelector("#inventoryTable tbody");
  tbody.innerHTML = "";

  inventory.forEach((item, index) => {
    const row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>₹${item.price}</td>
        <td>₹${item.qty * item.price}</td>
        <td>
          <button onclick="sellProduct(${index})">Sell 1</button>
          <button onclick="deleteProduct(${index})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function sellProduct(index) {
  if (inventory[index].qty > 0) {
    inventory[index].qty--;
    totalSales += inventory[index].price;
    document.getElementById("totalSales").innerText = totalSales;
  } else {
    alert("Out of stock!");
  }
  updateTable();
}

function deleteProduct(index) {
  inventory.splice(index, 1);
  updateTable();
}
