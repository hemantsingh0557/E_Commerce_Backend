import express from "express";
import { allRoutes } from "../routes/index.js";
import { validateRequest } from "../utils/helperFunctions.js";
import { authenticateToken } from "../services/authMiddleware.js";
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { authorizeRole } from "../services/authorizeRole.js";



// Multer storage configuration
const storage = multer.diskStorage({
    destination: './public/', // Directory where files will be uploaded
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Multer instance to handle file uploads
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 } // 10MB file size limit per file
}).array('files', 10); 


const handleRequest = (controller) => {
    return (req, res) => {
        const payload = {
            ...(req.body || {}),
            ...(req.query || {}),
            ...(req.params || {}),
            userId : req.user ,
            userRole : req.role ,
            files: req.files, 

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
    app.use(cors());
    app.use('/public', express.static('public')); 
    app.get('/', (req, res) => {
        res.send('Hello, World! This is an e-commerce website');
    });
    allRoutes.forEach(route => {
        const { method, path, schema = {}, auth = false, roles = [], controller, files } = route;
        const middlewares = [];
        if (schema) middlewares.push(validateRequest(schema));
        if (auth) middlewares.push(authenticateToken);
        if (roles.length) middlewares.push(authorizeRole(...roles));
        if (files) middlewares.push(upload); 
        app[method](path, ...middlewares, handleRequest(controller));
    });
}

export { expressStartup };









