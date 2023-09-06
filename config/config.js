require('dotenv').config();
module.exports = {
  "production": {
    "username": process.env.BDD_USER,
    "password": process.env.BDD_PASSWORD,
    "database": process.env.BDD_NAME,
    "host" : process.env.BDD_URL,
    "dialect": "mysql"
  },
  "development": {
    "username": process.env.BDD_USER,
    "password": process.env.BDD_PASSWORD,
    "database": process.env.BDD_NAME,
    "host" : process.env.BDD_URL,
    "dialect": "mysql"
  },
}