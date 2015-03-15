var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var universities = require("../models");


/* GET users listing. */
router.get('/:name', function(req, res) {
   var regex = new RegExp(req.params.name, 'i');
   universities.find({"name": regex}, function(err, result){
   			res.send(result);
   });

});

router.get('/', function(req, res) {
   var regex = new RegExp(req.params.name, 'i');
   universities.find({}, function(err, result){
   			res.send(result);
   });

});

router.get('/maxfees/:fee', function(req, res) {

    if(req.query.isLocal=="true")
    {

       console.log({"fees":{
    		"inState":{$lt:req.params.fee}
    	}});

    	universities.find({"fees.inState":{$lt:req.params.fee}
    	}, function(err, result){
   		    res.send(result);
        });
    }
    else if(req.query.isLocal=="false")
    {
         universities.find({}, function(err, result){
   			res.send(result);
  	    s });
    }

      

});

module.exports = router;
