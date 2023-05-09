const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    department:String,
    salary:Number,
    Date:Date
  })

const employeeModel = mongoose.model("employeedb",userSchema)

module.exports = employeeModel