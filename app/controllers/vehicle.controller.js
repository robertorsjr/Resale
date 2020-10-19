const Vehicle = require("../models/vehicle.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const vehicle = new Vehicle({
    model: req.body.model,
    brand: req.body.color,
    color: req.body.plate,
    plate: req.body.value,
    value: req.body.brand,
  });

  Vehicle.create(vehicle, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vehicle."
      });
    else res.status(201).send(data);
  });
};

exports.findAll = (req, res) => {
  Vehicle.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles."
      });
    else res.status(200).send(data);
  });
};

exports.findOne = (req, res) => {
  Vehicle.findById(req.params.vehicleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vehicle with id ${req.params.vehicleId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Vehicle with id " + req.params.vehicleId
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Vehicle.updateById(
    req.params.vehicleId,
    new Vehicle(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Vehicle with id ${req.params.vehicleId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Vehicle with id " + req.params.vehicleId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Vehicle.remove(req.params.vehicleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vehicle with id ${req.params.vehicleId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Vehicle with id " + req.params.vehicleId
        });
      }
    } else res.send({ message: `Vehicle was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Vehicle.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Vehicles."
      });
    else res.send({ message: `All Vehicles were deleted successfully!` });
  });
};