require('dotenv').config();

const config = {
  server: {
    hostname: process.env.SERVER_HOSTNAME,
    port: process.env.SERVER_PORT,
  },
  jwt: {
    secret: "goldshard",
  },
  database: {
    url: "mongodb://127.0.0.1/mydb",
  },
};

module.exports = config;
