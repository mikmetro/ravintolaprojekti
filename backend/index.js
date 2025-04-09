import express from 'express';
import cors from 'cors';
import api from './api/index.js';
import 'dotenv/config';
import { notFoundHandler, errorHandler } from './middlewares.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', api);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.API_PORT, process.env.API_HOST, () => {
  console.log(`Server running at http://${process.env.API_HOST}:${process.env.API_PORT}/`);
});
