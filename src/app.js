import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './docs/swagger.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use(errorHandler);

swaggerDocs(app);

export default app;
