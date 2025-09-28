const  {DataTypes} = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user",{
    Id:{
         type : DataTypes.INTEGER,
         autoIncrement : true,
         primaryKey : true
    },
    email:{
        type : DataTypes.STRING,
        unique:true,
        allowNull : false,
        validate : {isEmail:true}  
    },
    hashpassword:{
        type : DataTypes.STRING,
        allowNull:false,
    }
},{
    tablename : "user",
    timestamp : true
});

module.exports = User;