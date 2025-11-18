
import { GoogleGenAI, Type } from "@google/genai";
import type { Edital } from '../types.ts';

// This function is conceptual and requires a PDF text extraction library (e.g., pdf.js)
// to be used in a real application. For this example, we assume `pdfText` is available.
export const parseEditalWithGemini = async (pdfText: string): Promise<Edital | null> => {
    // In a real app, do not hardcode the API key. Use environment variables.
    // FIX: Safely check for process.env to avoid ReferenceError in browser environments.
    if (typeof process === 'undefined' || !process.env?.API_KEY) {
        console.error("API_KEY environment variable not set.");
        // Return a mock response or throw an error for the UI to handle.
        // This prevents the app from breaking if the API key is missing.
        return null;
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
        Analise o seguinte texto de um edital de concurso público e extraia a estrutura do conteúdo programático.
        Organize a saída em um formato JSON.
        O JSON deve ter uma chave "name" com o nome do concurso (se puder ser inferido) e uma chave "disciplines".
        "disciplines" deve ser um array de objetos. Cada objeto de disciplina deve ter um "id" único (ex: "d1", "d2"), um "name" (ex: "Língua Portuguesa") e um array de "topics".
        Cada objeto de tópico deve ter um "id" único (ex: "t1-1", "t1-2") e um "name" (ex: "Interpretação de textos").
        Ignore qualquer outra informação do edital que não seja o conteúdo programático.

        Texto do Edital:
        ---
        ${pdfText.substring(0, 30000)}
        ---
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        disciplines: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    name: { type: Type.STRING },
                                    topics: {
                                        type: Type.ARRAY,
                                        items: {
                                            type: Type.OBJECT,
                                            properties: {
                                                id: { type: Type.STRING },
                                                name: { type: Type.STRING },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        // Add a top-level ID to the edital object
        const finalEdital: Edital = {
            id: `edital-${Date.now()}`,
            ...parsedJson
        };

        return finalEdital;

    } catch (error) {
        console.error("Error parsing edital with Gemini:", error);
        return null;
    }
};