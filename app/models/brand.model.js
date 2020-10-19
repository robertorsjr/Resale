const sql = require("./db.js");

const Brand = function(brand) {
  this.name = brand.name;
  this.country = brand.country;
};
