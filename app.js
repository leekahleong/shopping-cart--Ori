const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Sample products
const products = [
  { id: 1, name: 'Product 1', price: 10.99 },
  { id: 2, name: 'Product 2', price: 20.99 },
  { id: 3, name: 'Product 3', price: 30.99 },
  { id: 4, name: 'Product 4', price: 40.99 },
];

let cart = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { products, cart });
});

app.post('/add-to-cart', (req, res) => {
  const productId = parseInt(req.body.id);
  const product = products.find(p => p.id === productId);
  if (product) {
    const item = cart.find(c => c.id === productId);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  }
  res.redirect('/');
});

app.post('/remove-from-cart', (req, res) => {
  const productId = parseInt(req.body.id);
  cart = cart.filter(item => item.id !== productId);
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
