
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeReceipt = async (imageBase64: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              text: "Analyze this receipt and extract the total amount, date, vendor name, and suggest an expense category (Meals, Transport, Office Supplies, Lodging, or Other). Output in JSON format.",
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            amount: { type: Type.NUMBER, description: "Total amount found on the receipt" },
            date: { type: Type.STRING, description: "Date of the transaction in YYYY-MM-DD format" },
            vendor: { type: Type.STRING, description: "Name of the merchant" },
            category: { type: Type.STRING, description: "Suggested category" },
            description: { type: Type.STRING, description: "A brief summary of what was purchased" }
          },
          required: ["amount", "date", "vendor", "category"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
};

export const getSmartFeedback = async (claimDetails: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Acting as a professional auditor, review this expense claim and provide a 1-sentence helpful tip or observation: ${claimDetails}`,
  });
  return response.text;
};
