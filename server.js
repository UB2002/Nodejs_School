const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const schoolRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(bodyParser.json());

// API Routes
app.use('/api', schoolRoutes);
// Start the server
app.get('/', (req, res) => {
    res.send('hello world')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
