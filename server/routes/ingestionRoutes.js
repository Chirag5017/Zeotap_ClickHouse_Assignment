import express from 'express';
import multer from 'multer';
import { uploadCSVToClickhouse, fetchClickhouseToFlatFile } from '../controllers/ingestionController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/flat-to-clickhouse', upload.single('file'), uploadCSVToClickhouse);
router.post('/clickhouse-to-flat', fetchClickhouseToFlatFile);

export default router;
