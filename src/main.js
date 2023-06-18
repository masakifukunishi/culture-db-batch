import DataInsertion from "./dataInsertion.js";

const main = async () => {
  const dataInsertion = new DataInsertion();

  await dataInsertion.insertCounties();
  await dataInsertion.insertCountyCultures();
  await dataInsertion.insertCountyFood();
  await dataInsertion.insertCountryImage();
  await dataInsertion.insertCountryFoodImage();
  await dataInsertion.insertCountryCultureImage();
};

main();
