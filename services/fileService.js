

import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { FILE_MESSAGE } from '../utils/constants.js';  

const FILE_UPLOAD_DIR = 'public/images/';  



export const fileService = {} ; 

fileService.saveFile = async (files) => {
    try 
    {
        if (!files || files.length === 0) return { success: false, message: FILE_MESSAGE.NO_FILES_PROVIDED, data: null };
        const filePaths = await Promise.all(files.map(file => fileService.saveIndividualFile(file)));
        if (filePaths.some(path => path === null)) return { success: false, message: FILE_MESSAGE.FAILED_TO_UPLOAD_FILE, data: null };
        return { success: true, message: FILE_MESSAGE.FILE_UPLOADED_SUCCESSFULLY, data: filePaths };
    } 
    catch (error) 
    {
        return { success: false, message: error.message , data: null };
    }
}

fileService.saveIndividualFile = (file) => {
    return new Promise((resolve, reject) => {
        try 
        {
            const fileName = uuidv4() + path.extname(file.originalname) ; 
            const filePath = path.join(FILE_UPLOAD_DIR, fileName) ; 
            fs.writeFile(filePath, file.buffer, (err) => {
                if (err) resolve(null); 
                else resolve(filePath); 
            });
        } 
        catch (error) 
        {
            resolve(null); 
        }
    });
}








