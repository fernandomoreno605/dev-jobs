import express from 'express'
import { jobsRouter } from './routes/jobs.js'
import { corsMiddleware } from './middlewares/cors.js'
import { DEFAULTS } from './config.js'
import { aiRouter } from './routes/ai.js';

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

app.use(corsMiddleware());
app.use(express.json());

app.use('/jobs', jobsRouter);
app.use('/ai', aiRouter);

app.get('/', (_request, response) => {
  return response.send("Service running");
});

app.get('/health', (_request, response) => {
  return response.status(200).json({
    uptime: process.uptime(),
    message: "OK"
  });
});

if (!process.env.NODE_ENV) {
  app.listen(PORT, () => {
    console.log(`Service running on http://localhost:${PORT}`);
  });
}

export default app;