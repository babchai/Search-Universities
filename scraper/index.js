'use strict';
module.exports = function (str) {
  console.log(str || 'Start...');

  var Crawler = require("crawler");
  var universities = require("./models.js");
  var url = require('url');
  var mongoose = require('mongoose');
  var c = new Crawler();
  var count = 0;

  mongoose.connect('mongodb://localhost/cialfo');


  var domain = "http://colleges.usnews.rankingsandreviews.com/";
	
  init();
  //getFees("$46,200 ");
 
  function init(){
      var firstPage = "best-colleges/rankings/national-universities/data";
      crawl(firstPage);
      console.log(count);

  }

  function getFees(tuitionFee){
    
     if(tuitionFee.search("in-state") > 0)
     {
	     var positionInstate = tuitionFee.search("in-state:");
		 var positionOutofState = tuitionFee.search("out-of-state:");
		
		 var inStateFee = tuitionFee.substr(0,positionOutofState);
		 inStateFee = inStateFee.replace(/,/g,'').replace('$','').split(':');
		 
		 var outStateFee = tuitionFee.substr(positionOutofState, tuitionFee.length);
	     outStateFee = outStateFee.replace(/,/g,'').replace('$','').split(':');

	     var fees = {inState:inStateFee[1].trim(), outState:outStateFee[1].trim()};
	     console.log(fees);
	 }
	 else
	 {
	 	tuitionFee = tuitionFee.replace(/,/g,'').replace('$','');
 		var fees = {inState: tuitionFee.trim(), outState: tuitionFee.trim()};
 		console.log(fees);
	 }


     return fees;
	 
  }

   function nextPage(page){
   	//console.log("go");
   		c.queue({
 			uri: domain + page,
 			jQuery:true, 
 	        
 			callback : function(error, result, $){
 				//console.log(error);
 				console.log(page);
 				$("#pagination").each(function(i , div){
 					if($(".pager_link").last().text() == "Next »")
                    {
                    	var page = $(".pager_link").last().attr("href");
                    	crawl(page);
                    }
                    else
                    { 
                    	console.log("finish");
                    	return;
                    }
 				});

 			}

   		});

   }	

	function crawl(page){
		console.log(page);
		c.queue({
		    uri: domain+page,
		    jQuery: true,
		   // timeout : 6000,
		    // The global callback won't be called
		    callback: function (error, result, $) {
		    
	        $("table > tbody > tr").each(function(index, tr){
	        	//console.log(tr);
	 			var schoolName = $(".school-name", tr).text();
	 			var tuitionFee = $(".search_tuition_display", tr).text();
	            tuitionFee = getFees(tuitionFee);
	            
	            //var out = schoolName + " "+ tuitionFee;
	 			console.log({name: schoolName, fees : tuitionFee, source: domain + page});


                universities.create({name: schoolName, fees : tuitionFee, source: domain + page});
	        });


		     console.log("next");
		     nextPage(page);
		    }
		});
    }

	
    
};
