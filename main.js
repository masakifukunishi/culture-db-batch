import openAIText from "./lib/openAIText.js";
import openAIImage from "./lib/openAIImage.js";
import restCountries from "./lib/restCountries.js";
import amazonS3 from "./lib/amazonS3.js";
import mongoDB from "./lib/mongoDB.js";

const insertCounties = async () => {
  const allInformationCountryies = await restCountries.getCountries();
  let countries = allInformationCountryies.map((country) => {
    return {
      name: country.name.common,
      code: country.cca2,
      capital: country.capital,
      region: country.region,
      subregion: country.subregion,
      population: country.population,
      area: country.area,
      languages: country.languages,
      currencies: country.currencies,
      flag: country.flag,
      map: country.maps.googleMaps,
      cultures: [],
      food: [],
      images: [],
    };
  });
  await mongoDB.insertMany(
    "countries",
    countries.filter((country) => country.name === "Japan")
  );
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

const insertCountryImage = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    const urls = await openAIImage.generateCountryImage(country.name);
    let s3Location = [];
    for (let i = 0; i < urls.length; i++) {
      s3Location.push(await amazonS3.uploadFile(urls[i], `${country.code}/images/${i}.png`));
    }
    await mongoDB.updateField("countries", country._id, "images", s3Location);
  }
};

const insertCountryFoodImage = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    for (let food of country.food) {
      const url = await openAIImage.generateCountryFoodImage(country.name, food.name);
      const s3Location = await amazonS3.uploadFile(url, `${country.code}/food/${food.name}.png`);
      await mongoDB.updateArrayField("countries", country._id, "food.name", food.name, "food.$.image", s3Location);
    }
  }
};

const insertCountryCultureImage = async () => {
  let countries = await mongoDB.getCountries();
  for (let country of countries) {
    for (let culture of country.cultures) {
      const url = await openAIImage.generateCountryCultureImage(country.name, culture.name);
      const s3Location = await amazonS3.uploadFile(url, `${country.code}/cultures/${culture.name}.png`);
      await mongoDB.updateArrayField("countries", country._id, "culture.name", culture.name, "culture.$.image", s3Location);
    }
  }
};

const main = async () => {
  await insertCounties();
  await insertCountyCultures();
  await insertCountyFood();
  await insertCountryImage();
  await insertCountryFoodImage();
  await insertCountryCultureImage();
};
main();
