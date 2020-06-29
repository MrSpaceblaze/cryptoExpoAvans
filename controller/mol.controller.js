const { createMollieClient } = require('@mollie/api-client');
const config = require("../config/wallets.json").MOL

const mollieclient = createMollieClient({ apiKey: config.apikey })

function molTransaction(res, productname, cost) {
    mollieclient.payments.create({
        amount: {
            value: cost.toFixed(2),
            currency: config.currency,
            r
        },
        description: productname + " costing: €" + cost,
        webhookUrl: config.webhook,
        redirectUrl: config.redirectUrl
    }).then(payment => {
        var paymentId = payment.id;
        //save payment id
        res.redirect(payment.getCheckoutUrl()).end();
    })
}

module.exports = { molTransaction }