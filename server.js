const express = require('express');
const bodyParser = require('body-parser');
const boxen = require('boxen');
const app = express();

const swaggerOptions = require('./config/swagger.config.json');
const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(swaggerOptions);

var name = require('./package.json').name

console.log(boxen(name,{
    padding: {
        left: 20,
        right: 20,
        top: 1,
        bottom: 1
    },
    margin: 1,
    borderStyle: 'double'
}));

app.use(bodyParser.json());

const routes = require('./routes/crypto.routes');

app.get("/youFool", (req, res) =>{
    res.status(418).send("You fool, you shouldn't have paid for it");
})

app.use('/crypto',routes);

app.use('*', (req, res) => {
    res.status(404).json({
        status: 404,
        endpoint: req.originalUrl, 
        message: req.originalUrl + " was not found", 
        datetime: new Date().toISOString()})
})

var server = app.listen(process.env.PORT || 5969, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Listening on localhost:" +port);
})

module.exports = {
    app
}