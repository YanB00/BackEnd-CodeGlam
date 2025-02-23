import express from "express";
import registerControllers from "./controllers/registerControllers.js"
import loginControllers from './controllers/loginControllers.js'
import employeeControllers from './controllers/employeeControllers.js'
import customerControllers from './controllers/customerControllers.js'

const routes = express.Router();

routes.use("/register", registerControllers)
routes.use("/login", loginControllers)
routes.use("/employee",employeeControllers)
routes.use("/customer", customerControllers)


export default routes;