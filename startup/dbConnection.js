
import mongoose from "mongoose";
import dotenv from  "dotenv" ;


dotenv.config() ;

const DATABASE_URL = process.env.DATABASE_URL ;

async function dbConnection()
{
    try
    {
        await mongoose.connect(DATABASE_URL) ;
        console.log('Connected to MongoDB');
    }
    catch(err)
    {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); 
    }
}

export {dbConnection} ; 









