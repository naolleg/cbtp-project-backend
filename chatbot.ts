import express from 'express';
import openai from './config/open-ai.js';
import colors from 'colors';

const router = express.Router();

router.post('/chat', async (req, res) => {
  const userInput = req.body.message;

  try {
    console.log(colors.bold.green('Welcome to the Chatbot Program!'));
    console.log(colors.bold.green('You can start chatting with the bot.'));

    const chatHistory = [];

    while (true) {
      let shouldRespond = false;
      const filterKeywords = [
        'hello', 'hi', 'hey', 'greetings', 'good', 'morning',
        'good', 'afternoon', 'good', 'evening', 'how', 'are',
        'you', 'what\'s', 'how\'s', 'it', 'going',
        'child', 'vaccinations', 'vaccine', 'schedule', 'immunization',
        'shots', 'baby', 'vaccines', 'infant', 'immunization',
        'vaccination', 'for', 'kids', 'vaccine', 'for', 'babies',
        'immunization', 'for', 'children', 'vaccine', 'shots',
        'vaccine', 'recommendations', 'immunization', 'guidelines',
        'vaccine', 'side', 'effects', 'vaccine-preventable', 'diseases',
        'child', 'vaccine', 'safety', 'vaccine', 'coverage',
        'vaccine', 'information', 'vaccine', 'myths', 'immunization',
        'records', 'vaccine', 'exemptions', 'catch-up', 'immunization',
        'vaccine', 'education', 'school', 'immunization', 'requirements',
      ];

      for (const keyword of filterKeywords) {
        if (userInput.toLowerCase().includes(keyword)) {
          shouldRespond = true;
          break;
        }
      }

      if (!shouldRespond) {
        res.json({ message: 'I only respond to child immunization and vaccine-related questions.' });
        continue;
      }

      const messages = chatHistory.map(([role, content]) => ({ role, content }));
      messages.push({ role: 'user', content: userInput });

      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      const completionText = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === 'exit') {
        res.json({ message: completionText });
        return;
      }

      res.json({ message: completionText });

      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
    }
  } catch (error) {
    console.error(colors.red(error));
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default router;