
import { fileController } from '../controller/fileController.js';



export const fileRoutes = [
    {
        method: 'post',
        path: '/uploadFile',
        files : true ,
        controller: fileController.uploadFile ,
    }
];















