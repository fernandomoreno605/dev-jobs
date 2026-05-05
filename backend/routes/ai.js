import { Router } from 'express';
import OpenAI from 'openai';
import { JobModel } from '../models/job.js';
import { CONFIG } from '../config.js';

export const aiRouter = Router();

const openai = new OpenAI({
  apiKey: CONFIG.GEMINI_API_KEY,
  baseURL: CONFIG.GEMINI_BASE_URL
});

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
    `Usa un tono claro y directo en españo`,
    `Titulo: ${job.titulo}`,
    `Empresa: ${job.empresa}`,
    `Ubicación: ${job.ubicacion}`,
    `Descripción: ${job.descripcion}`
  ].join('\n');

  try {
    const completion = await openai.chat.completions.create({
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
      reasoning_effort: "low"
    });

    const summary = completion.choices?.[0]?.message?.content?.trim();

    if(!summary) {
      return response
        .status(502)
        .json({error: 'No summary generated.'});
    }
    console.info('Job summary: ', summary);
    return response.json({summary});

  } catch (error) {
    console.error('Error: ',error)
    return response
      .status(500)
      .json(
        {
          error: 'Something goes wrong generating the job summary.'
        });
  }

});