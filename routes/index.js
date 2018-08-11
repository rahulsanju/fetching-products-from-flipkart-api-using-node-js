var express = require('express');
var router = express.Router();
var fkClient = require('./fkclient');
var dbConnection = require('../dbconnection');
var details = require('./details');


/* GET home page. */
router.get('/', function(req, res, next) {
  fkClient.getCategoryFeed({
    trackingId: details.trackingid
  }, function(err, result){
      if(!err){
        var listings = JSON.parse(result);
        var categories = Object.keys(listings.apiGroups.affiliate.apiListings);
        res.render('index',{
          title:listings.title,
          listings : categories
        });
        
      }else {
        console.log(err);
      }
  });
});

router.get('/updateListings',function(req,res,next){
  fkClient.getCategoryFeed({
    trackingId: details.trackingid
  }, function(err, result){
      if(!err){
        var listings = JSON.parse(result);
        var categories = Object.keys(listings.apiGroups.affiliate.apiListings);
        res.send(categories);
       dbConnection.query(`create table productsfeedlisting(
        category_id int(11) AUTO_INCREMENT,
        category_name varchar(100),
        getUrl varchar(200),
        deltaGet varchar(200),
        primary key(category_id)
        )`);

        categories.forEach(item => {
          getUrl=listings.apiGroups.affiliate.apiListings[item].availableVariants["v1.1.0"].get;
          deltaGet=listings.apiGroups.affiliate.apiListings[item].availableVariants["v1.1.0"].deltaGet;
          dbConnection.query("insert into productsFeedListing(category_name,getUrl,deltaGet) values('"+item+"','"+getUrl+"','"+deltaGet+"')",function(error,result,fields) {
            if(error){
              console.log(error);
            }
          });
        });        
      }else {
        console.log(err);
      }
  });
 
});

router.get('/deleteListings',function(req,res,next){
  dbConnection.query("drop table if exists productsfeddlisting");
  res.send('products feed listing table deleted');
})

module.exports = router;
