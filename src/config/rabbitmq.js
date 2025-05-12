// rabbitmq.js
const amqp = require('amqplib');

let channel = null;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost'); // atau URL RabbitMQ Anda
    channel = await connection.createChannel();
    await channel.assertQueue('test_queue'); // ganti dengan nama queue Anda
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
}

function publishToQueue(queueName, message) {
  if (channel) {
    channel.sendToQueue(queueName, Buffer.from(message));
  } else {
    console.error('Channel is not initialized');
  }
}

function consumeFromQueue(queueName, onMessage) {
  if (channel) {
    channel.consume(queueName, onMessage, { noAck: true });
  }
}

module.exports = {
  connectRabbitMQ,
  publishToQueue,
  consumeFromQueue
};
