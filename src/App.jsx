import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import ProductForm from './components/ProductForm';
import InventoryTable from './components/InventoryTable';
import SalesAnalytics from './components/SalesAnalytics';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const fetchSales = async () => {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .order('sold_at', { ascending: false });

    if (error) {
      console.error('Error fetching sales:', error);
    } else {
      setSales(data || []);
    }
  };

  const addProduct = async (productData) => {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } else {
      setProducts([data[0], ...products]);
    }
  };

  const sellProduct = async (product) => {
    if (product.quantity <= 0) {
      alert('Out of stock!');
      return;
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({ quantity: product.quantity - 1 })
      .eq('id', product.id);

    if (updateError) {
      console.error('Error updating product:', updateError);
      alert('Failed to process sale');
      return;
    }

    const { error: saleError } = await supabase
      .from('sales')
      .insert([{
        product_id: product.id,
        quantity_sold: 1,
        sale_amount: product.price
      }]);

    if (saleError) {
      console.error('Error recording sale:', saleError);
    }

    fetchProducts();
    fetchSales();
  };

  const deleteProduct = async (productId) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    } else {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Retail Shop Management</h1>
        <p>Modern inventory and sales tracking system</p>
      </header>

      <div className="container">
        <ProductForm onAddProduct={addProduct} />

        <SalesAnalytics sales={sales} products={products} />

        <InventoryTable
          products={products}
          loading={loading}
          onSell={sellProduct}
          onDelete={deleteProduct}
        />
      </div>
    </div>
  );
}

export default App;
