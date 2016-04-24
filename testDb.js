//test mysql
var Sequelize = require('sequelize');
var sequelize = new Sequelize('26Hf0WEIlRUASOxr', 'ucTMBnIVwoYf2hep', 'p9AqDp37oULtSlBuh', {host : '10.10.26.58', port : '3306', dialect : 'mysql'});

// definition
var Task = sequelize.define('Task', {
    // auto increment, primaryKey, unique
    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

    // comment
    title : {type : Sequelize.STRING, comment : 'Task title'},

    // allow null
    description : {type : Sequelize.TEXT, allowNull : true},

    // default value
    deadline : {type : Sequelize.DATE, defaultValue : Sequelize.NOW}
});

Task.sync().on('success', function(){
    console.log('aa..');
}).on('failure', function(){
    console.log('bb..');
});

sequelize.query('select * from posts  where slug = ?', null, {logging : true, plain : true,  raw : true}, ['ni-bu-shi-pi-qi-tai-pi-er-shi-ge-ju-tai-xiao']).success(function(res){
    console.log(res);
});