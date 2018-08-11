var details=require('../details');
var affiliate = require('flipkart-affiliate-client');
var fkClient = affiliate.createClient({
  FkAffId: details.trackingid,
  FkAffToken: details.token,
  responseType:'json'
});
module.exports = fkClient;