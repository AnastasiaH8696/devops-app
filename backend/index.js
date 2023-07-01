const express = require('express');
const cors = require('cors');
const port = 5000;

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hello from Express.js!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
