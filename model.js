var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var spatialData = new Schema({
  lat : Number,
  long : Number
});

module.exports = mongoose.model('Spatial', spatialData);
