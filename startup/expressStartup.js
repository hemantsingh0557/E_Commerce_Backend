import express from "express";
import { allRoutes } from "../routes/index.js";
import { validateRequest } from "../utils/helperFunctions.js";
import { authenticateToken } from "../services/authMiddleware.js";
import { loggerModel } from "../models/loggerModel.js";


const handleRequest = (controller) => {
    return (req, res) => {
        const payload = {
            ...(req.body || {}),
            ...(req.query || {}),
            ...(req.params || {}),
            userId: req.userId, 
            file: req.file, 
        };
        controller(payload)
        .then(async (result) => {
            // await loggerModel.create({
            //     action: result.statusCode, 
            //     message: result.data.message ? result.data.message : "Operation successful", 
            // });
            res.status(result.statusCode).json(result.data);
        })
        .catch(async (err) => {
            // await loggerModel.create({
            //     action: err.statusCode || 500,
            //     message: err.message || "An error occurred", 
            // });
            res.status(err.statusCode || 500).json({ message: err.message });
        });
    };
};

async function expressStartup(app) {
    app.use(express.json());
    app.get('/', (req, res) => {
        res.send('Hello, World! This is an e-commerce website');
    });
    allRoutes.forEach(route => {
        const { method, path, schema = {}, auth = false, controller } = route;
        const middlewares = [];
        if (schema) middlewares.push(validateRequest(schema));
        if (auth) middlewares.push(authenticateToken);
        app[method](path, ...middlewares, handleRequest(controller));
    });
}


export { expressStartup } ;



















