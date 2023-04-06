import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const runCompletion = async (prompt, maxTokens = 1000) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: maxTokens,
  });
  return completion.data.choices[0].text;
};

const getCountyCultures = async (countryName) => {
  const cultures = await runCompletion(
    `
    Return 2 names of ${countryName}'s culture.
    Carefully select the most famous and popular ones.
    separated by commas without space.
  `
    // Return a list of many names of ${countryName}'s culture.
  );
  // Return as many results as possible.
  return cultures.trim().split(",");
};

const getCountyCultureDescription = async (countryName, cutureName) => {
  const cultureDescription = await runCompletion(
    `
    Tell me about the culture of ${cutureName} in ${countryName}.
  `
  );
  return { name: cutureName, description: cultureDescription.trim() };
};

const getCountyFood = async (countryName) => {
  const food = await runCompletion(
    `
    Return 2 names of ${countryName} foods and drinks.
    Carefully select the most famous and popular ones.
    separated by commas without space.
  `
  );
  return food.trim().split(",");
};

const getCountyFoodDescription = async (countryName, foodName) => {
  const foodDescription = await runCompletion(
    `
    Tell me about ${foodName} in ${countryName}.
  `
  );
  return { name: foodName, description: foodDescription.trim() };
};

export default {
  getCountyCultures,
  getCountyCultureDescription,
  getCountyFood,
  getCountyFoodDescription,
};
