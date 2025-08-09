
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiAnalysis } from './types';

// Ensure the API key is available from the environment
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface PainDataContext {
  species: string;
  painType: string;
  scaleName: string;
  score: string;
  analysis: string;
}

// Define the JSON schema for the response
const schema = {
  type: Type.OBJECT,
  properties: {
    clinicalAnalysis: {
      type: Type.STRING,
      description: "Um resumo conciso do que o escore significa clinicamente, indo além da interpretação padrão."
    },
    actionSuggestions: {
      type: Type.STRING,
      description: "Recomendações claras e acionáveis de próximos passos, como analgesia de resgate, ajustes de protocolo ou monitoramento."
    },
    importantReminders: {
      type: Type.STRING,
      description: "Considerações específicas para a espécie, tipo de dor ou comorbidades. Opcional, incluir apenas se relevante."
    }
  },
  required: ["clinicalAnalysis", "actionSuggestions"]
};


export async function getPainAnalysis(context: PainDataContext): Promise<GeminiAnalysis> {
  const speciesPortuguese = context.species === 'dog' ? 'Cão' : 'Gato';
  const painTypePortuguese = context.painType === 'acute' ? 'Aguda' : 'Crônica';

  const prompt = `
    Você é um especialista veterinário sênior em manejo da dor, fornecendo uma segunda opinião concisa para um colega veterinário.
    Com base nos seguintes dados de avaliação, gere uma resposta JSON estruturada.

    Dados da Avaliação:
    - Espécie: ${speciesPortuguese}
    - Tipo de Dor: ${painTypePortuguese}
    - Escala Utilizada: ${context.scaleName}
    - Escore Obtido: ${context.score}
    - Interpretação Padrão da Escala: ${context.analysis}

    Sua Tarefa:
    Preencha os campos do schema JSON com base nos dados. Seja direto, profissional e use terminologia técnica apropriada. O objetivo é apoiar a decisão clínica, não substituí-la.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    // Basic validation in case the response isn't valid JSON, though the model should adhere to the schema.
    if (jsonText.startsWith('{') && jsonText.endsWith('}')) {
        return JSON.parse(jsonText) as GeminiAnalysis;
    } else {
        // Handle cases where the model might fail to produce perfect JSON despite the prompt
        console.error("Gemini response was not a valid JSON object:", jsonText);
        throw new Error("A IA retornou uma resposta em formato inesperado.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Erro ao contatar a IA: ${error.message}. Verifique a chave de API e a conexão.`);
    }
    throw new Error("Ocorreu um erro desconhecido ao contatar a IA.");
  }
}
