import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();
class OpenAI {
  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
  }
}

export default OpenAI;
