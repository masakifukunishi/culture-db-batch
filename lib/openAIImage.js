import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (prompt, num, size) => {
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
  const prompt = `
    ${countryName}
  `;
  return await generateImage(prompt, 2, "1024x1024");
};

const generateCountryFoodImage = async (countryName, foodName) => {
  const prompt = `${countryName}'s ${foodName}`;
  return await generateImage(prompt, 1, "512x512");
};

const generateCountryCultureImage = async (countryName, cultureName) => {
  const prompt = `${countryName}'s ${cultureName}`;
  return await generateImage(prompt, 1, "512x512");
};

export default { generateCountryImage, generateCountryFoodImage, generateCountryCultureImage };
