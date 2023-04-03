import openAIText from "./lib/openAIText.js";
import openAIImage from "./lib/openAIImage.js";
import amazonS3 from "./lib/amazonS3.js";
import mongoDB from "./lib/mongoDB.js";

const insertCounties = async () => {
  // let countriyNames = await openAIText.getCountries();
  let countriyNames = ["Japan"];
  let countries = [];
  for (let countryName of countriyNames) {
    countries.push(await openAIText.getCountryInfo(countryName));
  }
  await mongoDB.insertMany("countries", countries);
};

const insertCountyCultures = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    let cultureNames = [];
    let cultures = [];
    cultureNames = await openAIText.getCountyCultures(country.name);
    for (let cultureName of cultureNames) {
      cultures.push(await openAIText.getCountyCultureDescription(country.name, cultureName));
    }
    await mongoDB.updateField("countries", country._id, "cultures", cultures);
  }
};

const insertCountyFood = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    let foodNames = [];
    let food = [];
    foodNames = await openAIText.getCountyFood(country.name);
    for (let foodName of foodNames) {
      food.push(await openAIText.getCountyFoodDescription(country.name, foodName));
    }
    await mongoDB.updateField("countries", country._id, "food", food);
  }
};

const insertCities = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    let citieNames = [];
    citieNames = await openAIText.getCities(country.name);
    let cities = [];
    for (let cityName of citieNames) {
      cities.push(await openAIText.getCityInfo(cityName));
      cities[cities.length - 1].countryID = country._id.toString();
      cities[cities.length - 1].countryCode = country.countryCode;
      cities[cities.length - 1].countryName = country.name;
    }
    await mongoDB.insertMany("cities", cities);
  }
};

const insertCountryImage = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    const urls = await openAIImage.generateCountryImage(country.name);
    let s3Location = [];
    for (let i = 0; i < urls.length; i++) {
      s3Location.push(await amazonS3.uploadFile(urls[i], `${country.countryCode}/images/${i}.png`));
    }
    await mongoDB.updateField("countries", country._id, "images", s3Location);
  }
};

const insertCountryFoodImage = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    for (let food of country.food) {
      const url = await openAIImage.generateCountryFoodImage(country.name, food.name);
      const s3Location = await amazonS3.uploadFile(url, `${country.countryCode}/food/${food.name}.png`);
      await mongoDB.updateArrayField("countries", country._id, "food.name", food.name, "food.$.image", s3Location);
    }
  }
};

const insertCountryCultureImage = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    for (let culture of country.cultures) {
      const url = await openAIImage.generateCountryCultureImage(country.name, culture.name);
      const s3Location = await amazonS3.uploadFile(url, `${country.countryCode}/cultures/${culture.name}.png`);
      await mongoDB.updateArrayField("countries", country._id, "culture.name", culture.name, "culture.$.image", s3Location);
    }
  }
};

const main = async () => {
  await insertCounties();
  // await insertCountyCultures();
  // await insertCountyFood();
  // await insertCountryImage();
  // await insertCountryFoodImage();
  // await insertCities();
};
main();
