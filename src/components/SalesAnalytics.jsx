import { useMemo } from 'react';
import './SalesAnalytics.css';

function SalesAnalytics({ sales, products }) {
  const analytics = useMemo(() => {
    const totalRevenue = sales.reduce((sum, sale) => sum + parseFloat(sale.sale_amount), 0);
    const totalItemsSold = sales.reduce((sum, sale) => sum + sale.quantity_sold, 0);
    const totalInventoryValue = products.reduce(
      (sum, product) => sum + (product.quantity * parseFloat(product.price)),
      0
    );
    const totalProducts = products.length;

    return {
      totalRevenue,
      totalItemsSold,
      totalInventoryValue,
      totalProducts
    };
  }, [sales, products]);

  return (
    <div className="sales-analytics-section">
      <h2>Analytics Dashboard</h2>
      <div className="analytics-grid">
        <div className="analytics-card revenue">
          <div className="card-icon">$</div>
          <div className="card-content">
            <div className="card-value">${analytics.totalRevenue.toFixed(2)}</div>
            <div className="card-label">Total Revenue</div>
          </div>
        </div>

        <div className="analytics-card sales">
          <div className="card-icon">📦</div>
          <div className="card-content">
            <div className="card-value">{analytics.totalItemsSold}</div>
            <div className="card-label">Items Sold</div>
          </div>
        </div>

        <div className="analytics-card inventory">
          <div className="card-icon">🏪</div>
          <div className="card-content">
            <div className="card-value">${analytics.totalInventoryValue.toFixed(2)}</div>
            <div className="card-label">Inventory Value</div>
          </div>
        </div>

        <div className="analytics-card products">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <div className="card-value">{analytics.totalProducts}</div>
            <div className="card-label">Total Products</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesAnalytics;
