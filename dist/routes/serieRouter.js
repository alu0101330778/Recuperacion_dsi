import express from 'express';
import { createSerie, getSerieById, getSeries, deleteSerie, updateSerie, addUserToWatcher } from '../controllers/serie.controller.js';
const router = express.Router();
// Rutas para series
router.get('/series', getSeries);
router.get('/serie', getSerieById);
router.post('/serie', createSerie);
router.patch('/serie', updateSerie);
router.delete('/serie', deleteSerie);
router.patch('/serie/addUser', addUserToWatcher);
export default router;
