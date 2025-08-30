const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors({ origin: "*" } ));
app.use(express.json());

app.post('/login', (req, res) => {
  res.json({ message: 'Login successful', data: req.body });
});

app.get('/check-net', (_, res) => {
  res.send('Hello from the backend!');
})

module.exports = app;