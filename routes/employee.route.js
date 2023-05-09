const express = require("express")
const employeeModel = require("../models/employee.model")

const employeeRouter = express.Router()



// for filtering and getting all the employees
employeeRouter.get("/",async(req,res)=>{
    const {page,department} = req.query
    const queryObj = {}

    if(department){
        queryObj.department = department
    }
    try {
        const employeeData = await employeeModel.find(queryObj).skip((Number(page)-1)*5).limit(5)
        res.status(201).send({msg:"here is the list of all employees",employeeData})
    } catch (error) {
        res.status(400).send({msg:"error while fetching employees"})
    }
})


// for sorting
employeeRouter.get("/sort",async(req,res)=>{
    const {val,page=1} = req.query
    let sortWise = -1
    if(val==="asc"){
        sortWise=1
    }
    try {
        const data = await employeeModel.find().sort({salary:sortWise}).skip((Number(page)-1)*5).limit(5)
        res.status(201).send({msg:"here is the list of all employees",data})
    } catch (error) {
        res.status(400).send({msg:"error while fetching employees"})
    }
})

// for searching
employeeRouter.get("/search",async(req,res)=>{
    const {q} = req.query
    try {
        const data = await employeeModel.find({firstName:{$regex:q,$options:"i"}})
        res.status(201).send({msg:"here is the list of all employees",data})
    } catch (error) {
        res.status(400).send({msg:"error while fetching employees"})
    }
})


// for posting

employeeRouter.post("/",async(req,res)=>{
    try {
        const employeeData = new employeeModel(req.body)
        await employeeData.save()
        res.status(201).send({msg:"new employee has been added succesfully"})
    } catch (error) {
        res.status(400).send({msg:"error while adding new employee"})
    }
})

// for updating
employeeRouter.patch("/:id",async(req,res)=>{
    const {id} = req.params
    try {
        await employeeModel.findByIdAndUpdate(id,req.body)
        res.status(204).send({msg:" employee has been updated succesfully"})
    } catch (error) {
        res.status(400).send({msg:"error while updating employee"})
    }
})


// for deleting
employeeRouter.delete("/:id",async(req,res)=>{
    const {id} = req.params
    try {
        await employeeModel.findByIdAndDelete(id)
        res.status(201).send({msg:" employee has been deleted succesfully"})
    } catch (error) {
        res.status(400).send({msg:"error while deleting new employee"})
    }
})

module.exports = employeeRouter