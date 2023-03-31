const openAIApi = require("./lib/openAIApi");
const mongoDB = require("./lib/mongoDB");

const countries = async () => {
  // let countries = await openAIApi.getCountries();
  let countries = ["Japan"];
  countries = await openAIApi.getCountriesInfo(countries);
  await mongoDB.insertCountries(countries);
  countries = null;
};

const main = async () => {
  await countries();
  console.log(222);
};
main();
