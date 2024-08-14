import express from "express";
import { allRoutes } from "../routes/index.js";
import { validateRequest } from "../utils/helperFunctions.js";
import { authenticateToken } from "../services/authMiddleware.js";


// const handlers = (controller) => {
//     return (req, res) => {
//         let payload = {
//         ...(req.body || {}),
//         ...(req.query || {}),
//         ...(req.params || {}),
//         userId: req.userId,
//         file: req.file,
//         };

//         controller(payload)
//         .then(async (result) => {
//             await loggerModel.create({
//             action: result.statusCode,
//             message: result.data.message ? result.data.message : "success",
//             });
            
//             res.status(result.statusCode).json(result.data);
//         })
//         .catch(async (err) => {
//             await loggerModel.create({
//             action: err.statusCode ? err.statusCode : 500,
//             message: err.data ? result.data : "ERROR",
//             });
//             if (err?.statusCode) {
//             res.status(err?.statusCode).json(err.message);
//             }
//             res.status(500).json(err.message);
//         });
//     };
//   };

async function expressStartup(app)
{
    app.use( express.json() ) ;
    app.get( '/' , (req , res) => {
        res.send('Hello, Wolrd! This is a e-commerce website');
    } )
    allRoutes.forEach(route => {
        const { method, path, schema = {}, auth = false, controller } = route;
        const middlewares = [];
        if( schema ) middlewares.push( validateRequest(schema) ) ; 
        if( auth ) middlewares.push(authenticateToken)
        // app[method](path, ...middlewares, handlers(controller));
        app[method](path, ...middlewares, controller );

        // app.route(route.path)[route.method](...overwriteMiddlewareResult, handler(route.controller))
    })

}


export { expressStartup } ;
















