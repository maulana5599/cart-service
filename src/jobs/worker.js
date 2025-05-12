// worker.js
const { connectRabbitMQ, consumeFromQueue } = require('../config/rabbitmq');

connectRabbitMQ().then(() => {
  consumeFromQueue('test_queue', (msg) => {
    const content = msg.content.toString();
    console.log('Received message:', content);

    const data = JSON.parse(content);

    console.log('Tipe data', typeof data);
    // Lakukan sesuatu dengan data, misal simpan ke database
  });
});
