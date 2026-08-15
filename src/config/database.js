const { Sequelize } = require("sequelize");
const config = require("./config");

const env = process.env.NODE_ENV || "development";
const envConfig = process.env.DATABASE_URL;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  port: 13807,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
      ca: process.env.CA,
    },
  },
  logging: console.log, // Enable logging for debugging
});


sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });


module.exports = sequelize;
