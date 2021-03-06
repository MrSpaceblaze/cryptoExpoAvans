let routes = require("express").Router();
let controller = require("../controller/crypto.controller");

/**
 * pays a certain cost in bitcoin
 * @route POST / pay/BTC/:cost
 * @group Pay
 * @param {number} cost.required - Username of user
 */
routes.post("/pay/BTC/:cost", controller.bitcoinTransaction);

routes.post("/webhook", controller.webhook);

/**
 * pays a certain cost in Ethereum
 * @route POST / pay/ETH/:cost
 * @group Pay
 * @param {number} cost.required - Username of user
 */
routes.post("/pay/ETH/:cost", controller.etherTransaction);

/**
 * pays a certain cost in Stellar Lumens
 * @route POST / pay/XML/:cost
 * @group Pay
 * @param {number} cost.required - Username of user
 */
routes.post("/pay/XML/:cost", controller.lumenTransaction);

/**
 * pays a certain cost in Stellar Lumens
 * @route POST / pay/MOL/:cost
 * @group Pay
 * @param {number} cost.required - Username of user
 */
routes.post("/pay/MOL/:cost",controller.mollieTransaction);

module.exports = routes;