const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/db")

const Task = sequelize.define("task", {
        task:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty : true
        }
        },
        deadline:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notEmpty : true
            }
        },
        urgensi:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notEmpty : true
            }
        }
})

module.exports = Task