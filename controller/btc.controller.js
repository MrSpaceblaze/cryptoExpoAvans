const transaction = require("bitcoin-transaction");
const bitcoinTransaction = require("bitcoin-transaction");
var config = require("../config/wallets.json").BTC

function pay(wallet, cost, done){
    transaction.getBalance(wallet,{network: config.network}).then((balance) =>{
        if(balance < cost) {
            done(false, "You do not have enough in your wallet to send that much.");
        } else {
            bitcoinTransaction.sendTransaction({
                from: wallet.address,
                to: config.address,
                privKeyWIF: wallet.privKey,
                btc: cost,
                network: config.network,
                dryrun: config.dryrun
            }).catch((err)=>{
                done(false, err);
            }).then((msg) => {
                done(true, msg);
            });
        }
    })
}

module.exports = { pay };