var BTC = require("./btc.controller")
var ETH = require("./eth.controller")
var XML = require("./xml.controller")
var MOL = require("./mol.controller");

var ApiResponse = require("./models/api.response");

function lumenTransaction(req, res) {
    let wallet = req.body.wallet;
    let cost = req.params.cost;
    if(wallet == null) {
        res.status(417).json(new ApiResponse(417, "wallet not found"));
    } else {
        if(cost<0) {
            res.status(417).json(new ApiResponse(417, "cost cannot be lower than 0")).end();
        } else {
            XML.pay(wallet, cost, (done,msg) => {
                if(!done) {
                    res.status(400).json(new ApiResponse(400, msg))
                } else {
                    res.status(200).json(new ApiResponse(200, msg))
                }
            })
        }
    }
}

function etherTransaction(req, res) {
    let wallet = req.body.wallet;
    let cost = req.params.cost;
    if(wallet == null){
        res.status(417).json(new ApiResponse(417, "wallet not found"));
    } else {
        if (cost < 0) {
            res.status(417).json(new ApiResponse(417, "cost cannot be lower than 0")).end();
        } else {
            ETH.pay(wallet,cost,(done, err) =>{
                if(done) {
                    res.status(200).json(new ApiResponse(200, err)).end();
                } else {
                    res.status(400).json(new ApiResponse(400, err)).end();
                }
            })
        }
    }
}

function bitcoinTransaction(req,res) {
    let wallet = req.body.wallet;
    let cost = req.params.cost;

    if(wallet == null || wallet.address == null || wallet. privKey == null){
        res.status(417).json(new ApiResponse(417, "wallet/private key not found")).end()
    } else {
        if(cost < 0) {
            res.status(417).json(new ApiResponse(417, "cost cannot be lower than 0")).end();
        } else {
            BTC.pay(wallet,cost,(done, err) =>{
                if(done) {
                    res.status(200).json(new ApiResponse(200, err)).end();
                } else {
                    res.status(400).json(new ApiResponse(400, err)).end();
                }
            })
        }
    }
}

function mollieTransaction(req,res) {
    console.log(req.params)
    if(req.params.cost>0) {
        console.log(req.body)
        console.log(req.headers)
        MOL.molTransaction(res, req.body.productname,req.body.cost);
    } else {
        res.status(417).json(new ApiResponse(417, "Cost must be greater than 0")).end();
    }
}

module.exports = {
    lumenTransaction,
    etherTransaction,
    bitcoinTransaction,
    mollieTransaction
}