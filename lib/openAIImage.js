import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const imageGeneration = async (prompt, num, size) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: num,
    size: size,
  });

  if (num > 1) {
    return response.data.data.map((data) => data.url);
  }

  return response.data.data[0].url;
};

const generateCountryImage = async (countryName) => {
  return await imageGeneration(`Scenery and buildings that are the essence of ${countryName}`, 2, "1024x1024");
};
const generateCountryFoodImage = async (countryName, foodName) => {
  return await imageGeneration(`${countryName}'s ${foodName}`, 1, "512x512");
};

export default { generateCountryImage, generateCountryFoodImage };
