import https from "https";
import dotenv from "dotenv";

dotenv.config();

const getCountries = async () => {
  return new Promise((resolve, reject) => {
    https
      .get("https://restcountries.com/v3.1/all", (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

export default { getCountries };
