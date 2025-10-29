
'use server';
/**
 * @fileOverview An AI expert for the KAWADY website.
 *
 * - siteExpert - A function that handles answering questions.
 * - SiteExpertInput - The input type for the siteExpert function.
 * - SiteExpertOutput - The return type for the siteExpert function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const SiteExpertInputSchema = z.string();
export type SiteExpertInput = z.infer<typeof SiteExpertInputSchema>;

export const SiteExpertOutputSchema = z.string();
export type SiteExpertOutput = z.infer<typeof SiteExpertOutputSchema>;

export async function siteExpert(input: SiteExpertInput): Promise<SiteExpertOutput> {
  return siteExpertFlow(input);
}

const siteExpertFlow = ai.defineFlow(
  {
    name: 'siteExpertFlow',
    inputSchema: SiteExpertInputSchema,
    outputSchema: SiteExpertOutputSchema,
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.5-flash',
      system: `You are an expert assistant for KAWADY mildsteel consultants Ltd.
Your name is K-Bot.
Your expertise is in construction consultancy, project management, cost estimation, structural consultancy, site supervision, feasibility studies, architectural design, custom metalworks, expert welding, and artistic iron fabrication.
Keep your answers concise and helpful.
If the question is outside of your expertise, politely say that you can only answer questions related to construction and metalworks.
Do not answer questions about other companies or services.
Start the first response with a friendly greeting.`,
    });

    return llmResponse.text;
  }
);
