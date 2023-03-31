const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const runCompletion = async (prompt, maxTokens = 16) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: maxTokens,
  });
  return completion.data.choices[0].text;
};

const getCountries = async () => {
  const countries = await runCompletion(`
    Return the names of all countries in the world separated by commas without space.
    Don't omit the coountry name.
  `);
  return countries.trim().split(",");
};

const getCountriesInfo = async (country) => {
  const res = await runCompletion(
    `Tell me ${country}'s coountry name, country code, official language, area, population, GDP, area ranking, population ranking, GDP ranking.
     Your response should be in JSON format with 9 parameters 'name', 'countryCode', 'officialLangage', 'area', 'population', 'GDP', 'areaRanking', 'poplationRanking', 'GDPRanking'
     No comma is required for all values.
     Use the most recent data available.
     Don't omit the coountry name.
     Return the country code in two uppercase digits.
     Return an array of official languages, as there may be more than one.
     Use km2 as the unit of area, but do not need to return unit.
     Return only numbers for area, population, and GDP rankings.
     `,
    1000
  );
  // {
  //   "name": "United Kingdom"
  //   "code": "UB"
  //   "officialLangage": ["English"],
  //   "area": "1000",
  //   "population": "9999",
  //   "GDP": "20000000",
  //   "areaRanking": "10",
  //   "poplationRanking": "10",
  //   "GDPRanking": "10"
  // }
  console.log(res);
  console.log(JSON.parse(res));
  return JSON.parse(res);
};

const getCities = async (countryName) => {
  const cities = await runCompletion(
    `
    Return city names list of ${countryName} separated by commas without space.
    Return the results of the famous 5
    Don't omit the city name.
  `,
    1000
  );
  //     Return as many results as possible.
  return cities.trim().split(",");
};

module.exports = { getCountries, getCountriesInfo, getCities };
