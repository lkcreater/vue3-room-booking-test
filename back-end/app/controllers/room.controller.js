const db = require("../models");
const Room = db.room;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res) => {
    const data = await Room.findAll({
        where: {
            published: true
        }
    });

    res.send(data);
};