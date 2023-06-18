import OpenAIText from "./lib/open-ai/openAIText.js";
import OpenAIImage from "./lib/open-ai/openAIImage.js";
import RestCountries from "./lib/restCountries.js";
import AmazonS3 from "./lib/amazonS3.js";
import MongoDB from "./lib/mongoDB.js";

class DataInsertion {
  constructor() {
    this.openAIText = new OpenAIText();
    this.openAIImage = new OpenAIImage();
    this.restCountries = new RestCountries();
    this.amazonS3 = new AmazonS3();
    this.mongoDB = new MongoDB();
  }

  async insertCounties() {
    const allInformationCountries = await this.restCountries.getCountries();
    let countries = allInformationCountries.map((country) => {
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
    await this.mongoDB.insertMany(
      "countries",
      countries.filter((country) => country.name === "Japan")
    );
  }

  async insertCountyCultures() {
    let countries = await this.mongoDB.getCountries();

    for (let country of countries) {
      console.log(country);
      let cultureNames = [];
      let cultures = [];
      cultureNames = await this.openAIText.getCountyCultures(country.name);
      for (let cultureName of cultureNames) {
        cultures.push(await openAIText.getCountyCultureDescription(country.name, cultureName));
      }
      await this.mongoDB.updateField("countries", country._id, "cultures", cultures);
    }
  }

  async insertCountyFood() {
    let countries = await this.mongoDB.getCountries();
    for (let country of countries) {
      let foodNames = [];
      let food = [];
      foodNames = await this.openAIText.getCountyFood(country.name);
      for (let foodName of foodNames) {
        food.push(await this.openAIText.getCountyFoodDescription(country.name, foodName));
      }
      await this.mongoDB.updateField("countries", country._id, "food", food);
    }
  }

  async insertCountryImage() {
    let countries = await this.mongoDB.getCountries();
    for (let country of countries) {
      const urls = await this.openAIImage.generateCountryImage(country.name);
      let s3Location = [];
      for (let i = 0; i < urls.length; i++) {
        s3Location.push(await this.amazonS3.uploadFile(urls[i], `${country.code}/images/${i}.png`));
      }
      await this.mongoDB.updateField("countries", country._id, "images", s3Location);
    }
  }

  async insertCountryFoodImage() {
    let countries = await this.mongoDB.getCountries();
    for (let country of countries) {
      for (let food of country.food) {
        const url = await this.openAIImage.generateCountryFoodImage(country.name, food.name);
        const s3Location = await this.amazonS3.uploadFile(url, `${country.code}/food/${food.name}.png`);
        await this.mongoDB.updateArrayField("countries", country._id, "food.name", food.name, "food.$.image", s3Location);
      }
    }
  }

  async insertCountryCultureImage() {
    let countries = await this.mongoDB.getCountries();
    for (let country of countries) {
      for (let culture of country.cultures) {
        const url = await this.openAIImage.generateCountryCultureImage(country.name, culture.name);
        const s3Location = await this.amazonS3.uploadFile(url, `${country.code}/cultures/${culture.name}.png`);
        await this.mongoDB.updateArrayField("countries", country._id, "culture.name", culture.name, "culture.$.image", s3Location);
      }
    }
  }
}

export default DataInsertion;
