

import { fileService } from "../services/fileService.js";






export const fileController = { } ; 

fileController.uploadFile = async (payload) => {
    try 
    {
        const files = payload;
        const filePaths = await fileService.saveFile(files);
        if (!filePaths.success) return { statusCode: 400, data: { message: filePaths.message } };
        const response = {
            message: filePaths.message,
            filePaths: filePaths.data
        };
        return { statusCode: 200, data: response };
    } 
    catch (error) 
    {
        return { statusCode: 500, data: { message: error.message } };
    }
}


















