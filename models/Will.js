var Sequelize = require('sequelize');

// db config
var config = null;
if(process.env.MYSQL_INSTANCE_NAME){
	config = {};
	config.port = process.env.MYSQL_PORT_3306_TCP_PORT;
	config.addr = process.env.MYSQL_PORT_3306_TCP_ADDR;
	config.database = process.env.MYSQL_INSTANCE_NAME;
	config.password = process.env.MYSQL_PASSWORD;
	config.user = process.env.MYSQL_USERNAME;
	config.driver = "mysql";
}else if (process.env.PRODUCTION){
	config = require('../config/db.config.production.js');
}else{
	config = require('../config/db.config.dev.js');
}

console.log("port:" + config.port + ",address:" + config.addr + ",database:" + config.database + ",user=" + config.user);

// initialize database connection
// var sequelize = new Sequelize(
// 	config.database,
// 	config.user,
// 	config.password,
// 	{
//      host:config.addr,
//      port:config.port,
//      dialect: config.driver,
//      logging: console.log,
//      dialectOptions: {
//         socketPath: config.addr
//     },
//      define: {
// 	timestamps: false,
// 	paranoid: true
//      }
// 	}
// );

var sequelize = new Sequelize('26Hf0WEIlRUASOxr', 'ucTMBnIVwoYf2hep', 'p9AqDp37oULtSlBuh', 
		{host : '10.10.26.58', port : '3306', dialect : 'mysql',define: {
				timestamps: false
			}
		}
	);

var crypto = require('crypto');
var DataTypes = require("sequelize");

var Will = sequelize.define('will_i', {
             id:DataTypes.INTEGER,
	code: DataTypes.STRING,
	count:DataTypes.INTEGER,
	pos: DataTypes.STRING,
	neg: DataTypes.STRING,
	i_will_count:DataTypes.INTEGER,
	go_die_count:DataTypes.INTEGER,
	vote_up:DataTypes.INTEGER,
	vote_down:DataTypes.INTEGER,
	add_time:DataTypes.DATE
  }, {
    instanceMethods: {
      	retrieveAll: function(onSuccess, onError) {
		Will.findAll({}, {raw: true}).success(onSuccess).error(onError);
	  },
      	retrieveById: function(id, onSuccess, onError) {
		Will.find({where: {id: id}}, {raw: true}).success(onSuccess).error(onError);
	  },
  	retrieveByCode: function(code, onSuccess, onError) {
		Will.find({where: {code: code}}, {raw: true}).success(onSuccess).error(onError);
  	},
	retrieveRandom:function(onSuccess, onError){
		Will.findOne({where: {status: 1},order :sequelize.fn('RAND')}, {raw: true}).success(onSuccess).error(onError);
	},
      	add: function(onSuccess, onError) {
		var time = new Date().getTime();
		this.add_time = time;

		Will.build({
			code:this.code,
			count:this.count,
			pos:this.pos,
			neg:this.neg,
			i_will_count:this.i_will_count,
			go_die_count:this.go_die_count,
			vote_up:this.vote_up,
			vote_down:this.vote_down,
			add_time:this.add_time})
		    .save().success(onSuccess).error(onError);
	   },
	  updateById: function(id, onSuccess, onError) {
			Will.update({
			code:this.code,
			count:this.count,
			pos:this.pos,
			neg:this.neg,
			i_will_count:this.i_will_count,
			go_die_count:this.go_die_count,
			vote_up:this.vote_up,
			vote_down:this.vote_down},
			{where:
				{id:id}
			}).success(onSuccess).error(onError);
	   },
      	 removeById: function(user_id, onSuccess, onError) {
	  },
	  selectIWill:function(code, onSuccess, onError){
  		that.i_will_count = data.i_will_count + 1;
  		updateById(data.id,onSuccess,onError);
	  },
	  selectGoDie:function(){
		var that = this;
	  	this.retrieveByCode(code,function(data,onSuccess, onError){
	  		that.go_die_count = data.go_die_count + 1;
	  		updateById(data.id,onSuccess,onError);
	  	});
	  },
	  voteUp:function(){
		var that = this;
	  	this.retrieveByCode(code,function(data,onSuccess, onError){
	  		that.vote_up = data.vote_up + 1;
	  		updateById(data.id,onSuccess,onError);
	  	});
	  },
	  voteDown:function(){
		var that = this;
	  	this.retrieveByCode(code,function(data,onSuccess, onError){
	  		that.vote_down = data.vote_down + 1;
	  		updateById(data.id,onSuccess,onError);
	  	});
	  }

    }
  });

module.exports = Will;