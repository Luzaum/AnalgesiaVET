
import { GoogleGenAI } from "@google/genai";

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

export async function getPainAnalysis(context: PainDataContext): Promise<string> {
  const speciesPortuguese = context.species === 'dog' ? 'Cão' : 'Gato';
  const painTypePortuguese = context.painType === 'acute' ? 'Aguda' : 'Crônica';

  const prompt = `
    Você é um especialista veterinário sênior em manejo da dor, fornecendo uma segunda opinião concisa para um colego veterinário.
    Com base nos seguintes dados de avaliação, forneça uma análise profissional e sugestões. Não use formatação markdown (como ** ou *) na sua resposta. Use apenas parágrafos com quebras de linha.

    Dados da Avaliação:
    - Espécie: ${speciesPortuguese}
    - Tipo de Dor: ${painTypePortuguese}
    - Escala Utilizada: ${context.scaleName}
    - Escore Obtido: ${context.score}
    - Interpretação Padrão da Escala: ${context.analysis}

    Sua Tarefa:
    Em 2 ou 3 parágrafos curtos, forneça:
    1. Análise Clínica: Um resumo do que o escore significa clinicamente, além da interpretação padrão.
    2. Sugestões de Ação: Recomendações de próximos passos, como analgesia de resgate, ajustes de protocolo ou monitoramento.
    3. Lembretes Importantes: Considerações específicas para a espécie ou tipo de dor, se houver.

    Seja direto, profissional e use terminologia técnica apropriada. O objetivo é apoiar a decisão clínica, não substituí-la.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Erro ao contatar a IA: ${error.message}. Verifique a chave de API e a conexão.`;
    }
    return "Ocorreu um erro desconhecido ao contatar a IA.";
  }
}
