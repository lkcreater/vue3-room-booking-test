const db = require("../models");
const Book = db.book;

module.exports = async (req, res, next) => {
    try {
        const respone = await Book.vertifyDatetime(req.body.dateJob, req.body.startTimeJob);
        if(respone && respone.length > 0){
            console.table(respone);
            res.send({
                status: false,
                data: respone
            });
            return;
        }
        next();
    } catch (error) {
        res.status(500).send(error);
    }    
}