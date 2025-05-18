const express = require("express");
const sequelize = require("./src/config/database");
const apiRoutes = require("./src/routes/apiRoutes");
const {
  connectRabbitMQ,
  publishToQueue,
  consumeFromQueue,
} = require("./src/config/rabbitmq");
const Cart = require("./src/models/cart");

const app = express();
app.use(express.json()); // Untuk membaca body JSON dari request

const PORT = 3001;
const RABBITMQ_URL = "amqp://localhost";
const QUEUE_NAME = "test_queue";

(async () => {
  try {
    // Koneksi ke DB dan RabbitMQ
    await sequelize.authenticate();
    console.log("✅ DB Connected");

    // Sinkronisasi model Cart dengan database
    await sequelize.sync(); // Menyinkronkan atau membuat tabel jika belum ada
    console.log("✅ Tabel Cart disinkronkan");

    await connectRabbitMQ();

    // Listener RabbitMQ
    consumeFromQueue(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const cartData = JSON.parse(msg.content.toString());
        console.log("📥 Received:", cartData);

        try {
          await Cart.create(cartData);
          console.log("✅ Cart saved to DB");
        } catch (err) {
          console.error("❌ Error saving cart:", err);
        }
      }
    });

    // Tes route
    app.get("/", (req, res) => {
      res.send("Selamat datang di Cart Service !");
    });

    // Gunakan route gabungan untuk dashboard & cart
    app.use(apiRoutes);

    // Jalankan server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
})();
