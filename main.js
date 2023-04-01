const openAIApi = require("./lib/openAIApi");
const mongoDB = require("./lib/mongoDB");

const insertCounties = async () => {
  // let countriyNames = await openAIApi.getCountries();
  let countriyNames = ["Japan"];
  let countries = [];
  for (let countryName of countriyNames) {
    countries.push(await openAIApi.getCountryInfo(countryName));
  }
  await mongoDB.insertMany("countries", countries);
};

const insertCountyCultures = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    let cultureNames = [];
    let cultures = [];
    cultureNames = await openAIApi.getCountyCultures(country.name);
    for (let cultureName of cultureNames) {
      cultures.push(await openAIApi.getCountyCultureDescription(country.name, cultureName));
    }
    await mongoDB.updateField("countries", country._id, "cultures", cultures);
  }
};

const insertCountyFood = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    let foodNames = [];
    let food = [];
    foodNames = await openAIApi.getCountyFood(country.name);
    for (let foodName of foodNames) {
      food.push(await openAIApi.getCountyFoodDescription(country.name, foodName));
    }
    await mongoDB.updateField("countries", country._id, "food", food);
  }
};

const insertCities = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    let citieNames = [];
    citieNames = await openAIApi.getCities(country.name);
    let cities = [];
    for (let cityName of citieNames) {
      cities.push(await openAIApi.getCityInfo(cityName));
      cities[cities.length - 1].countryID = country._id.toString();
      cities[cities.length - 1].countryCode = country.countryCode;
      cities[cities.length - 1].countryName = country.name;
    }
    await mongoDB.insertMany("cities", cities);
  }
};

const main = async () => {
  // await insertCounties();
  // await insertCountyCultures();
  await insertCountyFood();
  // await insertCities();
};
main();
