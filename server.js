var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//routes
var router = express.Router();

router.use(function (req, res, next) {
  console.log('work');

  next();
});

router.get('/', function (req, res) {
  res.json({ message : 'api works!' });
});

//Setting up data handling
var DataSchema = require('./model.js');

router.route('/geo')

  .post(function (req, res) {
    var spatial = new DataSchema();
    // console.log(res);
    spatial.lat = req.body.lat;
    spatial.long = req.body.long;

    spatial.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({message: 'Data created'});
      }
    });

  })

  .get(function(req, res) {

    DataSchema.find(function (err, geo) {
      if (err) {
        res.send(err);
      } else {
        res.json(geo);
      }
    });

  })

  .delete(function (req, res) {
    var id = req.body._id;

    DataSchema.remove({ '_id': id }, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.json({message: 'Item ' + id + ' removed'});
      }

    });

  });

app.use('/api', router);

app.listen(port);
console.log('App listening on port ' + port);

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017');
