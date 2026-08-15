require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize
      .sync({ alter: false })
      .then(() => {
        console.log("✅ Database synced successfully.");
      })
      .catch((err) => {
        console.error("❌ Database sync failed:", err);
      });

    console.log("Database connection established.");
    app.listen(PORT, () =>
      console.log(`TaskFlow API listening on port ${PORT}`),
    );
  } catch (err) {
    console.error("Unable to connect to the database:", err.message);
    process.exit(1);
  }
}

start();
