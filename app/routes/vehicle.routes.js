module.exports = app => {
    const vehicles = require("../controllers/vehicle.controller.js");
    
  app.post("/vehicles", vehicles.create);

  app.get("/vehicles", vehicles.findAll);

  app.get("/vehicles/:vehicleId", vehicles.findOne);

  app.put("/vehicles/:vehicleId", vehicles.update);

  app.delete("/vehicles/:vehicleId", vehicles.delete);

  app.delete("/vehicles", vehicles.deleteAll);
};