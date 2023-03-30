const openAIApi = require("./lib/openAIApi");

async function main() {
  // let countries = await openAIApi.getCountries();
  let countries = ["UnitedKingdom"];
  countries = await openAIApi.getCountriesInfo(countries);
}
main();
