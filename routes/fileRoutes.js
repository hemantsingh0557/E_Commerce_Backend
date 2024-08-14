
import { fileController } from '../controller/fileController.js';



export const fileRoutes = [
    {
        method: 'post',
        path: '/uploadFile',
        uploadFiles : true ,
        controller: fileController.uploadFile ,
    }
];














