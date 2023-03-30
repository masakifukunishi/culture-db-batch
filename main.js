const openAIApi = require("./lib/openAIApi");
const mongoDB = require("./lib/mongoDB");

async function main() {
  // let countries = await openAIApi.getCountries();
  // let countries = ["UnitedKingdom"];
  // countries = await openAIApi.getCountriesInfo(countries);

  console.log(await mongoDB.getCollection());
}
main();
