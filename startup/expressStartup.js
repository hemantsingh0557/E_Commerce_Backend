import express from "express";
import { allRoutes } from "../routes/index.js";
// import { allRoutes } from "../routes/index.js";




async function expressStartup(app)
{
    app.use( express.json() ) ;
    app.get( '/' , (req , res) => {
        res.send('Hello, Wolrd! This is a e-commerce website');
    } )
    allRoutes.forEach(route => {
        const {} = route ;
    })
}


export { expressStartup } ;
















