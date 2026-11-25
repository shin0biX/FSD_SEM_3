const express = require('express');

const app = express();
const PORT = 3000;

const products = [
  { id: 301, name: 'Wireless Mouse', category: 'Electronics', price: 799, quantity: 25, inStock: true },
  { id: 302, name: 'Notebook', category: 'Stationery', price: 60, quantity: 100, inStock: true },
  { id: 303, name: 'USB Keyboard', category: 'Electronics', price: 999, quantity: 0, inStock: false }
];

const findProduct = (id) => products.find((p) => p.id === Number(id));

const nextId = () => Math.max(...products.map((p) => p.id), 0) + 1;

app.use(express.json());

app.get('/api/products', (req, res) => res.status(200).json(products));

app.get('/api/products/filter', (req, res) => {
  const category = req.query.category;
  const found = typeof category === 'string'
    ? products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : [];
  res.status(200).json(found);
});

app.post('/api/products', (req, res) => {
  const { name, category, price, quantity, inStock } = req.body || {};
  const invalid =
    typeof name !== 'string' || name.trim() === '' ||
    typeof category !== 'string' || category.trim() === '' ||
    typeof price !== 'number' || !Number.isFinite(price) ||
    typeof quantity !== 'number' || !Number.isFinite(quantity) ||
    typeof inStock !== 'boolean';
  if (invalid) {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  const product = { id: nextId(), name, category, price, quantity, inStock };
  products.push(product);
  res.status(201).json(product);
});

app.get('/api/products/:id', (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.status(200).json(product);
});

app.put('/api/products/:id', (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const body = req.body || {};
  const invalid =
    ('name' in body && (typeof body.name !== 'string' || body.name.trim() === '')) ||
    ('category' in body && (typeof body.category !== 'string' || body.category.trim() === '')) ||
    ('price' in body && (typeof body.price !== 'number' || !Number.isFinite(body.price))) ||
    ('quantity' in body && (typeof body.quantity !== 'number' || !Number.isFinite(body.quantity))) ||
    ('inStock' in body && typeof body.inStock !== 'boolean');
  if (invalid) {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  Object.assign(product, body);
  res.status(200).json(product);
});

app.delete('/api/products/:id', (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products.splice(products.indexOf(product), 1);
  res.status(200).json({ message: 'Product deleted successfully', id: product.id });
});

app.listen(PORT, () => {
  console.log(`Product inventory API listening on http://localhost:${PORT}`);
});
