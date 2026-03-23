import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';

// Routes
import menuRoutes from './routes/menuRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Charger les variables d'environnement
dotenv.config();

// Connexion DB
connectDB();

// Initialiser Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: 'API Saveur de la Terre',
    version: '1.0.0',
    status: 'active',
    endpoints: {
      menu: '/api/menu',
      reservations: '/api/reservations',
      reviews: '/api/reviews',
      contact: '/api/contact'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// Lancer le serveur (fallback si port occupé)
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
    console.log(`Environnement: ${process.env.NODE_ENV || 'development'}`);
    console.log(`API disponible sur: http://localhost:${port}`);
    console.log(`Endpoints: /api/menu | /api/reviews | /api/reservations | /api/contact`);

    process.on('SIGTERM', () => {
      console.log('SIGTERM reçu. Arrêt du serveur...');
      server.close(() => {
        console.log('Serveur arrêté proprement');
        process.exit(0);
      });
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      if (nextPort <= 5010) {
        console.log(`Port ${port} occupé, tentative sur le port ${nextPort}...`);
        startServer(nextPort);
      } else {
        console.error(`Tous les ports 5000-5010 sont occupés. Arrêtez l'autre processus ou définissez PORT dans .env`);
        process.exit(1);
      }
    } else {
      throw err;
    }
  });
};

startServer(DEFAULT_PORT);

export default app;