const openAIApi = require("./lib/openAIApi");
const mongoDB = require("./lib/mongoDB");

const insertCounties = async () => {
  // let countriyNames = await openAIApi.getCountries();
  let countriyNames = ["Japan"];
  let countries = [];
  for (let countryName of countriyNames) {
    countries.push(await openAIApi.getCountriesInfo(countryName));
  }
  await mongoDB.insertCountries(countries);
  countries = null;
};

const insertCities = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    cities = await openAIApi.getCities(country.name);
  }
};

const main = async () => {
  await insertCounties();
  // await insertCities();
};
main();
