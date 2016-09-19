var express = require('express');
var router = express.Router();
var burgers = require('../models/burgers.js');

router.get('/', function(req,res) {
	res.redirect('/burgers')
});

router.get('/burgers', function(req,res) {
	burgers.all(function(data){
		var hbsObject = {burgers : data}
		console.log(hbsObject)
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function(req,res) {
	burgers.create(['name'], [req.body.name, req.body.sleepy], function(data){
		burgers.redirect('/burgers')
	});
});

router.put('/burgers/update/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burgers.update({'sleepy' : req.body.sleepy}, condition, function(data){
		res.redirect('/burgers');
	});
});

router.delete('/burgers/delete/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	burgers.delete(condition, function(data){
		res.redirect('/burgers');
	});
});

module.exports = router;