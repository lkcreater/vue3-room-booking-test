const db = require("../models");
const Book = db.book;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req.body);
    const attrib = req.body;  
    Book.create(attrib)
        .then(data => {
            res.send({
                status: true,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findJob = async (req, res) => {
    try {
        if(!req.params.roomId){
            res.status(500).send({
                message: "required room id"
            })
        }

        const data = await Book.listOnJob(req.params.roomId);
        res.send({
            status: true,
            data: data
        });
    } catch (err) {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
    }
};

exports.test = async (req, res) => {
    try {
        
        res.send({
            status: true,
            data: 'data'
        });
    } catch (err) {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
    }
};