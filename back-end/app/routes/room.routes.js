module.exports = app => {
    const controller = require("../controllers/room.controller.js");
  
    var router = require("express").Router();

    // Retrieve a single Tutorial with id
    router.get("/", controller.findAll);
  
    // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/room", router);
};
  