var StellarSdk =require('stellar-sdk');
const { Networks } = require('stellar-sdk');
const config = require("../config/wallets.json").XML
const server = new StellarSdk.Server(config.network, {allowHttp: true});

function pay(wallet, cost, done) {
    server.loadAccount(wallet.publicKey).then(account => {
    server.fetchBaseFee().then(fee => {

    const sourceKeypair = StellarSdk.Keypair.fromSecret(wallet.secret);
    const sourcePublicKey = sourceKeypair.publicKey();

    const transaction = StellarSdk.TransactionBuilder(account, {
        fee,
        networkPassphrase: Networks.TESTNET
        })
        .addOperation(StellarSdk.Operation.payment({
            destination: config.address,
            asset: StellarSdk.Asset.native(),
            amount: cost+""
        }))
        .setTimeout(30)
        .build();

        transaction.sign(sourceKeypair);

        try{
            server.submitTransaction(transaction).then(transactionResult => {
            console.log(JSON.stringify(transactionResult));
            done(true,transactionResult)
            })
        }
        catch(e) {
            done(false, e);
        }
        })
    })
}

module.exports = {pay}