import { useState } from 'react';
import './ProductForm.css';

function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.quantity || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.quantity <= 0 || formData.price <= 0) {
      alert('Quantity and price must be positive numbers');
      return;
    }

    onAddProduct({
      name: formData.name,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price)
    });

    setFormData({ name: '', quantity: '', price: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="product-form-section">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            required
          />
        </div>
        <button type="submit" className="btn-primary">Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;
