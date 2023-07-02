
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
    }
});

// insert new campus
Campus.sync({alter:true})

// find all campuses
const findCampuses = async () => {
    try{
        const allCampuses = await Campus.findAll();
        return allCampuses;
    } catch(error) {
        next(error);
    }
}




module.exports = {Campus, findCampuses}; //export campus model and findCampuses function