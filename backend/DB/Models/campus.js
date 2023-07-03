const { DataTypes } = require("sequelize");
const db = require("../db");

//create campus table and define columns
const Campus = db.define('campus', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    studentid : {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true
    }
});




module.exports = Campus; 