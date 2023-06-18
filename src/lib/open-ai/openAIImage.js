import OpenAI from "./openAI.js";

class OpenAIImage extends OpenAI {
  async generateImage(prompt, num, size) {
    const response = await this.openai.createImage({
      prompt: prompt,
      n: num,
      size: size,
    });

    if (num > 1) {
      return response.data.data.map((data) => data.url);
    }

    return response.data.data[0].url;
  }

  async generateCountryImage(countryName) {
    const prompt = `
      ${countryName}
    `;
    return await this.generateImage(prompt, 2, "1024x1024");
  }

  async generateCountryFoodImage(countryName, foodName) {
    const prompt = `${countryName}'s ${foodName}`;
    return await this.generateImage(prompt, 1, "512x512");
  }

  async generateCountryCultureImage(countryName, cultureName) {
    const prompt = `${countryName}'s ${cultureName}`;
    return await this.generateImage(prompt, 1, "512x512");
  }
}

export default OpenAIImage;
