const { publishToQueue } = require("../config/rabbitmq");

const HelloWorld = (req, res) => {
    res.send("Hello World!");
}

const SendCart = (req, res) => {
    try {
        const productId = req.body.productId;
        
        const sendCart = {
            productId: productId,
            qty: req.body.qty
        }

        /**
         * Send into baackgroun proses.
         */
        publishToQueue('test_queue', JSON.stringify(sendCart));

        res.status(200).send({
            message: "Add cart success",
            data: req.body
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    HelloWorld,
    SendCart
}
