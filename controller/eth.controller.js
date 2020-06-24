var Web3 = require('web3');
var web3 = new Web3('https://ropsten.infura.io/v3/6d91cecce31e43a4963f57b702650600');
var config = require("../config/wallets.json").ETH;

function pay(wallet, cost, done) {
    var eth = web3.eth;
    eth.getBalance(wallet.adress).then((balance) => {
        if(isNaN(balance)) {
            done(false,balance);
        } else {
            var bal = parseInt(balance);
            if(bal < cost) {
                done(false, "balance too low");
            }
            else {
                eth.sendTransaction({
                    from: wallet,
                    to: ETH,
                    value: cost,
                    chaim: "ropsten"
                }, (err, res) => {
                    if(err){
                        done(false, err);
                    } else {
                        done(true, res);
                    }
                })
            }
        }
    })
}

module.exports = {
    pay
}