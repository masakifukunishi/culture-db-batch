import OpenAI from "./openAI.js";

class OpenAIText extends OpenAI {
  async runCompletion(prompt, maxTokens = 1000) {
    const completion = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: maxTokens,
    });
    return completion.data.choices[0].text;
  }

  async getCountyCultures(countryName) {
    const prompt = `
      Return 2 names of ${countryName}'s culture.
      Carefully select the most famous and popular ones.
      separated by commas without space.
    `;
    const cultures = await this.runCompletion(prompt);

    // Return a list of many names of ${countryName}'s culture.
    // Return as many results as possible.
    return cultures.trim().split(",");
  }

  async getCountyCultureDescription(countryName, cultureName) {
    const prompt = `
      Tell me about the culture of ${cultureName} in ${countryName}.
    `;
    const cultureDescription = await this.runCompletion(prompt);
    return { name: cultureName, description: cultureDescription.trim() };
  }

  async getCountyFood(countryName) {
    const prompt = `
      Return 2 names of ${countryName} foods and drinks.
      Carefully select the most famous and popular ones.
      separated by commas without space.
    `;
    const food = await this.runCompletion(prompt);
    return food.trim().split(",");
  }

  async getCountyFoodDescription(countryName, foodName) {
    const prompt = `
      Tell me about ${foodName} in ${countryName}.
    `;
    const foodDescription = await this.runCompletion(prompt);
    return { name: foodName, description: foodDescription.trim() };
  }
}

export default OpenAIText;
