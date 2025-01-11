import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getAIEnhancedDescription = async (landmark) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable tour guide providing interesting insights about landmarks. Keep responses brief and engaging, focusing on unique or lesser-known facts."
        },
        {
          role: "user",
          content: `Provide a brief, interesting insight about ${landmark.title}. Use the following description as context: ${landmark.description}`
        }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error getting AI description:', error);
    return null;
  }
};
