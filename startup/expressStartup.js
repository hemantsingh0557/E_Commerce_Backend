import express from "express";
import { allRoutes } from "../routes/index.js";
import { validateRequest } from "../utils/helperFunctions.js";
import { authenticateToken } from "../services/authMiddleware.js";
import cors from 'cors';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: './public/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 } 
}).fields([
    { name: 'images', maxCount: 10 } 
]);


const handleRequest = (controller) => {
    return (req, res) => {
        const payload = {
            ...(req.body || {}),
            ...(req.query || {}),
            ...(req.params || {}),
            // userId: req.userId, 
            file: req.file, 
        };
        controller(payload)
        .then(async (result) => {
            res.status(result.statusCode).json(result.data);
        })
        .catch(async (err) => {
            res.status(err.statusCode || 500).json({ message: err.message });
        });
    };
};



async function expressStartup(app) {
    app.use(express.json());
    app.use( cors() ) ;
    app.use( 'public' , express.static('public')) ;
    app.get('/', (req, res) => {
        res.send('Hello, World! This is an e-commerce website');
    });
    allRoutes.forEach(route => {
        const { method, path, schema = {}, auth = false, controller , file } = route;
        const middlewares = [];
        if (schema) middlewares.push(validateRequest(schema));
        if (auth) middlewares.push(authenticateToken);
        if (auth) middlewares.push(authenticateToken);
        if (file) middlewares.push(uploads.single("file"));
        app[method](path, ...middlewares, handleRequest(controller));
    });
}


export { expressStartup } ;



















