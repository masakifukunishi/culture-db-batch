<div align="center">

# culture-db-batch

<div style="background-color:#fff">
  <a href="https://openai.com/" target="_blank">
    <img width="140" alt="OpenAI-logo" src="README/OpenAI.png" />
  </a>
  <a href="https://mongodb.com/" target="_blank">
    <img width="140" alt="mongoDB-logo" src="README/mongoDB.png" />
  </a>
  <a href="https://aws.amazon.com/s3/" target="_blank">
    <img width="140" alt="S3-logo" src="README/S3.png" />
  </a>
  </div>
</div>
## What is this?

- Get data

  1. countries data from REST Countries API
  1. countries' culture data from OpenAI API
  1. countries' food data from OpenAI API
  1. countries' image data from OpenAI API (DALL·E 2)
  1. countries' culture image data from OpenAI API (DALL·E 2)
  1. countries' food image data from OpenAI API (DALL·E 2)

- Store data

  - 1 ~ 3 data to MongoDB

  ```json
  [
    {
      "_id": {
        "$oid": "642b1e8e1b03a4509ca99130"
      },
      "name": "Canada",
      "code": "JP",
      "capital": ["Tokyo"],
      "region": "Asia",
      "subregion": "Eastern Asia",
      "population": 125836021,
      "area": 377930,
      "languages": {
        "jpn": "Japanese"
      },
      "currencies": {
        "JPY": {
          "name": "Japanese yen",
          "symbol": "¥"
        }
      },
      "flag": "🇯🇵",
      "map": "https://goo.gl/maps/NGTLSCSrA8bMrvnX9",
      "cultures": [
        {
          "name": "Anime",
          "description": "Anime is hand-drawn and computer-generated animation originating from Japan.",
          "image": "URL to Amazon S3"
        }
      ],
      "food": [
        {
          "name": "sushi",
          "description": "Sushi is a dish made of vinegared rice and seafood or vegetables.",
          "image": "URL to Amazon S3"
        }
      ],
      "images": ["URL to Amazon S3", "URL to Amazon S3"]
    }
  ]
  ```

  - 4 ~ 6 data (images) to AWS S3
    - 4 countries image data to `AWS_S3_BUCKET_NAME/countries/image`
    - 5 food's image data to `AWS_S3_BUCKET_NAME/countries/food`
    - 6 culture's image data to `AWS_S3_BUCKET_NAME/countries/cultures`

## How to use

### npm install

```
npm install
```

### setting environment variables

```
mv .env.example .env
```

set environment variables

### execute

```
node main.js
```
