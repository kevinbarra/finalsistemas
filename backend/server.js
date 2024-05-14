const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config(); // Utiliza variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Configuración del pool de PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Necesario para conexiones seguras, ajustar según tus requisitos
    }
});

// Configura CORS
app.use(cors({
    origin: '*' // Ajusta esto para permitir solo ciertos orígenes si es necesario
}));

app.use(express.json());

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM products'); // Asegúrate de que la tabla se llama 'products'
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
