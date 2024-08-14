


import { FILE_MESSAGE } from '../utils/constants.js';  


export const fileService = {} ; 

fileService.saveFile = async (files) => {
    try 
    {
        // console.log( "okoo " ,  files   ) ;
        console.log( typeof files   ) ;
        // console.log( files.length   ) ;
        if (!files || files.length === 0) return { success: false, message: FILE_MESSAGE.NO_FILES_PROVIDED, data: null };
        const filePaths = await Promise.all(files.map(file => file.path ));
        console.log( filePaths   ) ;
        if (filePaths.some(path => path === null)) return { success: false, message: FILE_MESSAGE.FAILED_TO_UPLOAD_FILE, data: null };
        return { success: true, message: FILE_MESSAGE.FILE_UPLOADED_SUCCESSFULLY, data: filePaths };
    } 
    catch (error) 
    {
        return { success: false, message: error.message , data: null };
    }
}








