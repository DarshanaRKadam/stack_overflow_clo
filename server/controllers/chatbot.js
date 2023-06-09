import dotenv from "dotenv";
dotenv.config()
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  organization: "org-b8VPaUXf73ccNEFp5rajWiqe",
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatbotController = async (req, res) => {
  const { message } = req.body
  console.log(message)
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0,
    });
    res.status(200).json({
      message: response.data.choices[0].text
    })
  } catch (error) {
    console.log(error)
    res.status(400).json("Something went wrong...")
  }
}