// server.js
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');

const app = express();
app.use(cors()); 
// app.use(express.urlencoded({extended:true}));
app.use(express.json())

const swaggerDocument = YAML.load('./swagger.yaml');

// Serve the Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
mongoose.connect('mongodb+srv://cab-connect:fVoCTUKlip5aqdEi@cluster0.elhbzoy.mongodb.net/',
    {
        useNewUrlParser: true,
    }
)
    .then(() => {
        console.log('Connected to MongoDB');
    })

// Import routes
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const cabRoutes = require('./routes/cabRoutes');
const tripRoutes = require('./routes/tripRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/cabs', cabRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));