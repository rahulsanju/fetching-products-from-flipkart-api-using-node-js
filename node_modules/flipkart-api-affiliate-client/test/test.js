var client = require('../index');
var assert = require('assert');
var fkClient = client({
    trackingId:process.env.trackingId,
    token:process.env.token,
},"json");


describe('API Requests',function(){
    var Url;
/**
 * Get the Product Feed Listings
 */
    describe('getProductsFeedListing',function(){
        it('should return object with status code 200',function(){
            return new Promise(function(resolve){
                fkClient.getProductsFeedListing().then(function(value){
                    if(value.status != 200){
                        throw value.error;
                    }
                    var jsonData = JSON.parse(value.body);
                    Url = jsonData.apiGroups.affiliate.apiListings.televisions.availableVariants['v1.1.0'].get;
                    assert.strictEqual(200,value.status);
                    resolve();
                });
            });
        });
    });
/**
 * Search Product based on the Keyword
 */
    describe('doKeywordSearch',function(){
        it('should return object with status code 200',function(){
            return new Promise(function(resolve){
                fkClient.doKeywordSearch("mobiles",10).then(function(value){
                    if(value.status != 200){
                        throw value.error;
                    }
                    
                    assert.strictEqual(200,value.status);
                    resolve();
                });
            });
        });
    });

/**
 * Search Product based on the Product Id
 */
    describe('doIdSearch',function(){
        it('should return object with status code 200',function(){
            return new Promise(function(resolve){
                fkClient.doIdSearch('MOBDPPZZPXVDJHSQ').then(function(value){
                    if(value.status != 200){
                        throw value.error;
                    }
                  
                    assert.strictEqual(200,value.status);
                    resolve();
                });
            });
        });
    });

    /**
     * Get All Offers
     */
    describe('getAllOffers',function(){
        it('should return object with status code 200',function(){
            return new Promise(function(resolve){
                fkClient.getAllOffers().then(function(value){
                    if(value.status != 200){
                        throw value.error;
                    }
                   
                    assert.strictEqual(200,value.status);
                    resolve();
                });
            });
        });
    });

    /**
     * Get Deals Of The Day
     */

    describe('getDealsOfTheDay',function(){
        it('should return object with status code 200',function(){
            return new Promise(function(resolve){
                fkClient.getDealsOfTheDay().then(function(value){
                    if(value.status != 200){
                        throw value.error;
                    }
                   
                    assert.strictEqual(200,value.status);
                    resolve();
                });
            });
        });
    });

    /**
     * Get Orders Report
     */
    describe('getOrdersReport',function(){
        it('should return object with status code 200',function(){
            return new Promise(function(resolve){
                var obj = {
                    startDate:'2012-03-01',
                    endDate:'2018-04-01',
                    status:'approved',
                    offset:'0'
                };
                fkClient.getOrdersReport(obj).then(function(value){
                    if(value.status != 200){
                        throw value.error;
                    }
                   
                    assert.strictEqual(200,value.status);
                    resolve();
                });
            });
        });
    });


 /**
     * Get Products Feed
     */
    describe('getProductsFeed',function(){
        it('should return object with status code 200',function(){
            return new Promise(function(resolve){
                fkClient.getProductsFeed(Url).then(function(value){
                    if(value.status != 200){
                        throw value.error;
                    }
                   
                    assert.strictEqual(200,value.status);
                    resolve();
                });
            });
        });
    });


});


