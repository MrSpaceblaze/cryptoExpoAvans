var StellarSdk =require('stellar-sdk');
const { Networks } = require('stellar-sdk');
var config = require("../config/wallets.json").XML
const server = new StellarSdk.Server('config.network');

function pay(wallet, cost, done) {
    const destinationaccount = await server.loadAccount(wallet.publicKey)
    const fee = await server.fetchBaseFee();

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
            const transactionResult = await server.submitTransaction(transaction);
            console.log(JSON.stringify(transactionResult));
            done(true,transactionResult)
        }
        catch(e) {
            done(false, e);
        }
}

module.exports = {pay}