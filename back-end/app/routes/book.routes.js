const { body } = require('express-validator');
const vertifyBook = require('../middles/vertifyBook');

module.exports = app => {
    const controller = require("../controllers/book.controller.js");
  
    var router = require("express").Router();

    router.get("/job/:roomId",  controller.findJob);

    router.post("/test", vertifyBook, controller.test);

    router.post("/",  vertifyBook, controller.create);
    // Retrieve a single Tutorial with id
    //router.get("/", controller.findAll);
  
    // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/book", router);
};
  