const { createMollieClient } = require('@mollie/api-client');
const config = require("../config/wallets.json").MOL

const mollieclient = createMollieClient({ apiKey: config.apikey })

function molTransaction(res, productname, cost) {
    mollieclient.payments.create({
        amount: {
            value: cost.toFixed(2),
            currency: config.currency
        },
        description: productname + " costing: €" + cost
    }).then(payment => {
        res.redirect(payment.getCheckoutUrl()).end();
    })
}

module.exports = { molTransaction }