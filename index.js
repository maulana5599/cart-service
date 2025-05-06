const express = require("express");
const sequelize = require("./src/config/database");
const dashboardRoutes = require("./src/routes/apiRoutes");
const amqp = require("amqplib");

const app = express();
app.use(express.json());

const PORT = 3000;
const RABBITMQ_URL = "amqp://localhost"; // Ganti sesuai konfigurasi RabbitMQ-mu
const QUEUE_NAME = "test_queue";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connected");

    app.use(dashboardRoutes)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
})();
