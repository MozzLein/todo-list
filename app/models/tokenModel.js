const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/db")
const cron = require("node-cron")

const Tokens = sequelize.define("token", {
        token:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty : true
        }
    }
})

//penjadwalan untuk menghapus data
cron.schedule('* 15 * * *', async () => {
    try {
        const batasWaktu = new Date()
        batasWaktu.setSeconds(batasWaktu.getSeconds() - 1)

        await Tokens.destroy({
            where: {
                createdAt : {
                    [Sequelize.Op.lt]: batasWaktu
                }
            }
        })
        console.log("Token yang di blacklist sudah di hapus")
    } catch (error) {
        console.error('Error menghapus token: ', error)
    }
})


module.exports = Tokens