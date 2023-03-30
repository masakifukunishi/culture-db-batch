const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(prompt, maxTokens = 16) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: maxTokens,
  });
  return completion.data.choices[0].text;
}

async function getCountries() {
  const countries = await runCompletion(`
    Return the names of all countries in the world separated by commas without space.
    Don't omit the coountry name.
  `);
  return countries.trim().split(",");
}

async function getCountriesInfo(countries) {
  const countriesObj = {};
  for (let country of countries) {
    const res = await runCompletion(
      `Tell me UnitedKingdom's coountry name, Major Cities, official language, area, population, GDP, area ranking, population ranking, GDP ranking.
     Your response should be in JSON format with 9 parameters 'countryName', 'majorCities', 'officialLangage', 'area', 'population', 'GDP', 'areaRanking', 'poplationRanking', 'GDPRanking'
     No comma is required for all values.
     Use the most recent data available.
     Don't omit the coountry name.
     Return an array of official languages, as there may be more than one.
     Use km2 as the unit of area, but do not need to return unit.
     Return only numbers for area, population, and GDP rankings.
     Return an array of official languages, as there are several major cities.
     `,
      50
    );
    countriesObj[country] = JSON.parse(res);
  }
  // {
  //   "countryName": "United Kingdom"
  //   "majorCities": ["London", "Manchester"],
  //   "officialLangage": ["English"],
  //   "area": "1000",
  //   "population": "9999",
  //   "GDP": "20000000",
  //   "areaRanking": "10",
  //   "poplationRanking": "10",
  //   "GDPRanking": "10"
  // }
  return countriesObj;
}

async function main() {
  // let countries = await getCountries();
  let countries = ["UnitedKingdom"];
  countries = await getCountriesInfo(countries);
}
main();
