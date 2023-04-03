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

const getCities = async (countryName) => {
  const cities = await runCompletion(
    `
    Return city names list of ${countryName} separated by commas without space.
    Return only 2 cities.
    Don't omit the city name.
  `
  );
  // Return as many results as possible.
  return cities.trim().split(",");
};

const getCityInfo = async (city) => {
  const res = await runCompletion(
    `tell me forrowing city information.
     ${city} city's city name, area, population, GDP, area ranking, population ranking, GDP ranking.
     Your response should be in JSON format with 7 parameters 'name', 'area', 'population', 'GDP', 'areaRanking', 'poplationRanking', 'GDPRanking'
     Don't include commas in numeric values.
     Use the most recent data available.
     Don't omit the city name.
     Use km2 as the unit of area, but do not need to return unit.
     Return only numbers for area, population, and GDP rankings.
     `
  );
  // {
  //   "name": "London"
  //   "area": "1000",
  //   "population": "9999",
  //   "GDP": "20000000",
  //   "areaRanking": "10",
  //   "poplationRanking": "10",
  //   "GDPRanking": "10"
  // }
  return JSON.parse(res);
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
  getCities,
  getCityInfo,
  getCountyCultures,
  getCountyCultureDescription,
  getCountyFood,
  getCountyFoodDescription,
};
