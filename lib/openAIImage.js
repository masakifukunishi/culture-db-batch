const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const imageGeneration = async (prompt, num, size) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: num,
    size: size,
  });
  return response.data.data[0].url;
};

const generateCountryImage = async (countryName) => {
  return await imageGeneration(`Scenery and buildings that are the essence of ${countryName}`, 1, "512x512");
};

module.exports = {
  generateCountryImage,
};
