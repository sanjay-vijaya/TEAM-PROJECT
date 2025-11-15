import './InventoryTable.css';

function InventoryTable({ products, loading, onSell, onDelete }) {
  if (loading) {
    return (
      <div className="inventory-section">
        <h2>Current Inventory</h2>
        <div className="loading">Loading inventory...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="inventory-section">
        <h2>Current Inventory</h2>
        <div className="empty-state">
          <p>No products in inventory yet</p>
          <p className="hint">Add your first product using the form above</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-section">
      <h2>Current Inventory</h2>
      <div className="table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className={product.quantity === 0 ? 'out-of-stock' : ''}>
                <td className="product-name">{product.name}</td>
                <td className="quantity">
                  <span className={`stock-badge ${product.quantity === 0 ? 'empty' : product.quantity < 10 ? 'low' : 'good'}`}>
                    {product.quantity}
                  </span>
                </td>
                <td className="price">${parseFloat(product.price).toFixed(2)}</td>
                <td className="total-value">
                  ${(product.quantity * parseFloat(product.price)).toFixed(2)}
                </td>
                <td className="actions">
                  <button
                    onClick={() => onSell(product)}
                    className="btn-sell"
                    disabled={product.quantity === 0}
                  >
                    Sell 1
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryTable;
