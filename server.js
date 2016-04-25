
var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path');

var app = express();
app.use(bodyParser());

var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 8080;

var Will = require("./models/Will.js")

var router = express.Router();

router.route('/will')
.post(function(req, res) {

	var pos = req.params.pos || req.body.pos;
	var neg = req.params.neg|| req.body.neg;
	console.log(pos + "," + neg);

	var code = generateCode();
	var count = 1;
	var i_will_count = 0;
	var go_die_count = 0;
	var vote_up = 0;
	var vote_down = 0;

	var will = Will.build({
			code:code,
			count:count,
			pos:pos,
			neg:neg,
			i_will_count:i_will_count,
			go_die_count:go_die_count,
			vote_up:vote_up,
			vote_down:vote_down });

	will.add(function(success){
		res.json({ message: '提交成功，审核通过就能与大家见面' });
	},
	function(err) {
		res.send(err);
	});
})
.get(function(req, res) {
	var will = Will.build();

	will.retrieveRandom(function(will) {
		if (will) {
		  res.json(will);
		} else {
		  res.send(401, "random Will not found");
		}
	  }, function(error) {
		res.send("error hapens");
	  });
});


router.route('/will/:will_code')
.put(function(req, res) {
})
.get(function(req, res) {
	var will = Will.build();

	will.retrieveByCode(req.params.will_code, function(wills) {
		if (wills) {
		  res.json(wills);
		} else {
		  res.send(401, "wills not found");
		}
	  }, function(error) {
		res.send("Wills not found");
	  });
});

router.route("/iwill/:will_code").get(function(req,res){
	var will = Will.build();

	will.retrieveByCode(req.params.will_code,function(will){
		will.i_will_count = parseInt(will.i_will_count) + 1;
		will.count = parseInt(will.count) + 1;
		var result = Will.build(will)
		result.updateById(will.id,function(){
			res.json({ success:true, message: '记录成功' });
		},function(){
			res.json({ success:true, message: '记录成功' });
		});
	})
});

router.route("/godie/:will_code").get(function(req,res){
	var will = Will.build();

	will.retrieveByCode(req.params.will_code,function(will){
		will.go_die_count = parseInt(will.go_die_count) + 1;
		will.count = parseInt(will.count) + 1;
		var result = Will.build(will)
		result.updateById(will.id,function(){
			res.json({ success:true, message: '记录成功' });
		},function(){
			res.json({ success:true, message: '记录成功' });
		});
	})
});

router.route("/voteup/:will_code").get(function(req,res){
	var will = Will.build();

	will.retrieveByCode(req.params.will_code,function(will){
		will.vote_up = parseInt(will.vote_up) + 1;
		will.count = parseInt(will.count) + 1;
		var result = Will.build(will)
		result.updateById(will.id,function(){
			res.json({ success:true, message: '记录成功' });
		},function(){
			res.json({ success:true, message: '记录成功' });
		});
	})
});


router.route("/votedown/:will_code").get(function(req,res){
	var will = Will.build();

	will.retrieveByCode(req.params.will_code,function(will){
		will.vote_down = parseInt(will.vote_down) + 1;
		will.count = parseInt(will.count) + 1;
		var result = Will.build(will)
		result.updateById(will.id,function(){
			res.json({ success:true, message: '记录成功' });
		},function(){
			res.json({ success:true, message: '记录成功' });
		});
	})
});

var hCodes = ['H','h'];
var eCodes = ['E','e'];
var lCodes = ['L','I','l','1'];
var oCodes = ['o','O','0'];
var _Codes = ['-','_'];
var wCodes = ['W','w','vv','vW','Vv','VV'];
var rCodes = ['R','r'];
var dCodes = ['D','d'];

function generateCode(){
	var code = "";
	code += hCodes[Math.floor(Math.random() * hCodes.length)];
	code += eCodes[Math.floor(Math.random() * eCodes.length)];
	code += lCodes[Math.floor(Math.random() * lCodes.length)];
	code += lCodes[Math.floor(Math.random() * lCodes.length)];
	code += oCodes[Math.floor(Math.random() * oCodes.length)];
	code += _Codes[Math.floor(Math.random() * _Codes.length)];
	code += wCodes[Math.floor(Math.random() * wCodes.length)];
	code += oCodes[Math.floor(Math.random() * oCodes.length)];
	code += rCodes[Math.floor(Math.random() * rCodes.length)];
	code += lCodes[Math.floor(Math.random() * lCodes.length)];
	code += dCodes[Math.floor(Math.random() * dCodes.length)];
	return code;
}

router.use(function(req, res, next) {
	// do logging
	//console.log('');
	next();
});

app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port);
console.log('正在监听端口' + port);
