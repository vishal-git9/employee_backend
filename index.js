const express = require("express")
const { connection } = require("./config/db")
require("dotenv").config()
const cors = require("cors")
const userRouter = require("./routes/user.routes")
const employeeRouter = require("./routes/employee.route")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/employees",employeeRouter)

app.listen(`${process.env.LOCAL_HOST}`,async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected")
    }

    console.log(`running on ${process.env.LOCAL_HOST}`)
})