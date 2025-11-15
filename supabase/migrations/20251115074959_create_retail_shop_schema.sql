/*
  # Retail Shop Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text) - Product name
      - `quantity` (integer) - Current stock quantity
      - `price` (decimal) - Product price
      - `created_at` (timestamptz) - When product was added
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `sales`
      - `id` (uuid, primary key) - Unique identifier for each sale
      - `product_id` (uuid, foreign key) - Reference to product
      - `quantity_sold` (integer) - Number of units sold
      - `sale_amount` (decimal) - Total sale amount
      - `sold_at` (timestamptz) - When the sale occurred
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public access (retail shop context)
    
  3. Important Notes
    - Products table tracks inventory in real-time
    - Sales table maintains complete sales history
    - Triggers could be added later for automatic stock updates
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sales table
CREATE TABLE IF NOT EXISTS sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity_sold integer NOT NULL DEFAULT 1,
  sale_amount decimal(10,2) NOT NULL,
  sold_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_sales_product_id ON sales(product_id);
CREATE INDEX IF NOT EXISTS idx_sales_sold_at ON sales(sold_at DESC);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (retail shop context)
CREATE POLICY "Allow public read access to products"
  ON products FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to products"
  ON products FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update to products"
  ON products FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete to products"
  ON products FOR DELETE
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to sales"
  ON sales FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to sales"
  ON sales FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for products table
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();