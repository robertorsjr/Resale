const sql = require("./db.js");
const Brand = require(".brand.model.js");

// constructor
const Vehicle = function(vehicle){
  this.model = vehicle.model;
  this.color = vehicle.color;
  this.plate = vehicle.plate;
  this.value = vehicle.value;
  this.brand = vehicle.brand;
}

Vehicle.create = (newVehicle, result) => {
    sql.query("INSERT INTO vehicles SET ?", newVehicle, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created vehicle: ", { id: res.insertId, ...newVehicle });
      result(null, { id: res.insertId, ...newVehicle });
    });
  };
  
  Vehicle.getAll = result => {
    sql.query("SELECT * FROM vehicles", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("vehicles: ", res);
      result(null, res);
    });
  };
  
  Vehicle.findById = (vehicleId, result) => {
    sql.query(`SELECT * FROM vehicles WHERE id = ${vehicleId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Vehicle: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };
  
  Vehicle.updateById = (id, vehicle, result) => {
    sql.query(
      "UPDATE vehicles SET model = ?, color = ?, plate = ?, value = ?, brand = ?, WHERE id = ?",
      [vehicle.model, vehicle.color, vehicle.plate, vehicle.value, vehicle.brand, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated vehicle: ", { id: id, ...vehicle });
        result(null, { id: id, ...vehicle });
      }
    );
  };
  
  Vehicle.remove = (id, result) => {
    sql.query("DELETE FROM vehicles WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Vehicle with id: ", id);
      result(null, res);
    });
  };
  
  Vehicle.removeAll = result => {
    sql.query("DELETE FROM vehicles", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} vehicles`);
      result(null, res);
    });
  };
  module.exports = Vehicle;
