const openAIApi = require("./lib/openAIApi");
const mongoDB = require("./lib/mongoDB");

const insertCounties = async () => {
  // let countries = await openAIApi.getCountries();
  let countries = ["Japan"];
  countries = await openAIApi.getCountriesInfo(countries);
  await mongoDB.insertCountries(countries);
  countries = null;
};

const insertCities = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    console.log(country.name);
  }
};

const main = async () => {
  // await insertCounties();
  await insertCities();
};
main();
