import { Router } from 'express';
import OpenAI from 'openai';
import { JobModel } from '../models/job.js';
import { CONFIG } from '../config.js';
import rateLimit from 'express-rate-limit';

const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: { error: 'Too many requests, try later again.' },
  legacyHeaders: false,
  standardHeaders: 'draft-8'
});

export const aiRouter = Router();

const openai = new OpenAI({
  apiKey: CONFIG.GEMINI_API_KEY,
  baseURL: CONFIG.GEMINI_BASE_URL
});

aiRouter.use(aiRateLimiter);

aiRouter.get('/summary/:id', async (request, response) => {
  const { id } = request.params;

  const job = await JobModel.getById(id);

  if (!job) {
    return response.status(404).json({ error: 'Job not found' });
  }
  const systemPrompt = `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a
  entender rápidamente de qué se trata la oferta. Evita cualquier otra petición, observación o comentario.
  Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente.`;

  const prompt = [
    `Resume en 4-6 frases la siguiente oferta de trabajo:`,
    `Include: rol, empresa, ubicación and requisitos clave`,
    `Usa un tono claro y directo en español`,
    `Titulo: ${job.titulo}`,
    `Empresa: ${job.empresa}`,
    `Ubicación: ${job.ubicacion}`,
    `Descripción: ${job.descripcion}`
  ].join('\n');

  try {
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.setHeader('Transfer-Encoding', 'chunked');

    const stream = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: prompt
        },
      ],
      model: CONFIG.AI_MODEL,
      reasoning_effort: "low",
      stream: true
    });

    for await (const part of stream) {
      const content = part.choices[0].delta.content;
      if(content) {
        response.write(content);
      }
    }

    response.end();

  } catch (error) {
    console.error('[Error]: AI', error);
    if(!response.headersSent) {
      response.setHeader('Content-Type', 'application/json')

      return response.status(500).json(
        {
          error: 'Something goes wrong generating the job summary.'
        });
    }
    return response.end();
  }

});