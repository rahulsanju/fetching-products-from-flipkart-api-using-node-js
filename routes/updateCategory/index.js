var express = require('express');
var router = express.Router();
var dbConnection = require('../../dbConnection');
var details = require('../details');
var client = require('flipkart-api-affiliate-client');

var fkClient2 = client({
    trackingId:details.trackingid,
    token:details.token,
},"json");

router.get('/:category',function(req,res,next){
    var getCategoryUrl = new Promise(function(resolve, reject){
        dbConnection.query('select * from productsFeedListing',function(error,results,fields){
            console.log("checking given category in DataBase");
            results.forEach(result => {
                if(req.params.category == result.category_name){
                    resolve(result.getUrl);
                }
            });
        });
    });
    getCategoryUrl.then(function(getUrl){
        console.log("entered into then function");
        dbConnection.query(`create table ProductsFeed(
            id int(20) AUTO_INCREMENT,
            p_id varchar(200) COLLATE utf8_general_ci UNIQUE,
            p_category varchar(200) COLLATE utf8_general_ci,
            p_title varchar(1000) COLLATE utf8_general_ci,
            p_img_small varchar(1000) COLLATE utf8_general_ci,
            p_img_medium varchar(1000) COLLATE utf8_general_ci,
            p_img_large varchar(1000) COLLATE utf8_general_ci,
            p_retail_price Int(100),
            p_fk_selling_price Int(100),
            p_fk_special_price Int(100),
            p_retail_currency varchar(20) COLLATE utf8_general_ci,
            p_productBrand varchar(200) COLLATE utf8_general_ci,
            p_inStock tinyint,
            p_productUrl varchar(1000) COLLATE utf8_general_ci,
            p_cod tinyint,
            PRIMARY KEY(id)
        )`);
        console.log("Products feed table created");
        return new Promise(function(resolve,reject){    
            var insertProductsFromUrl = function(url){
                if(url == null || url == ''){
                    res.send('no url given');
                }
                    fkClient2.getProductsFeed(url).then(function(data){                    
                        json_data = JSON.parse(data.body);
                        json_data.products.forEach(product => {
                        
                            dbConnection.query(`insert into ProductsFeed(
                                p_id,
                                p_category,
                                p_title,
                                p_img_small,
                                p_img_medium,
                                p_img_large,
                                p_retail_price,
                                p_fk_selling_price,
                                p_fk_special_price,
                                p_retail_currency,
                                p_productBrand,
                                p_inStock,
                                p_productUrl,
                                p_cod
                            ) values(
                                ${dbConnection.escape(product.productBaseInfoV1.productId)},
                                ${dbConnection.escape(req.params.category)},
                                ${dbConnection.escape(product.productBaseInfoV1.title)},
                                ${dbConnection.escape(product.productBaseInfoV1.imageUrls["200x200"])},
                                ${dbConnection.escape(product.productBaseInfoV1.imageUrls["400x400"])},
                                ${dbConnection.escape(product.productBaseInfoV1.imageUrls["800x800"])},
                                ${dbConnection.escape(product.productBaseInfoV1.maximumRetailPrice.amount)},
                                ${dbConnection.escape(product.productBaseInfoV1.flipkartSellingPrice.amount)},
                                ${dbConnection.escape(product.productBaseInfoV1.flipkartSpecialPrice.amount)},
                                ${dbConnection.escape(product.productBaseInfoV1.flipkartSellingPrice.currency)},                               
                                ${dbConnection.escape(product.productBaseInfoV1.productBrand)},
                                ${dbConnection.escape(product.productBaseInfoV1.inStock)},
                                ${dbConnection.escape(product.productBaseInfoV1.productUrl)},
                                ${dbConnection.escape(product.productBaseInfoV1.codAvailable)}

                            )
                            `);   

                        });/*for each loop*/
                        if(json_data.nextUrl){
                            insertProductsFromUrl(json_data.nextUrl);
                        }else{
                            resolve("Selected Category Products inserted into database");
                        }

                    }).catch(function(error){
                        console.log('error occured');
                    });                
            };
            insertProductsFromUrl(getUrl);
        }).then(function(tempData){
            res.send(tempData);  
        });
    });
});



module.exports = router;