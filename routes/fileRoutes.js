
import { fileController } from '../controller/fileController.js';



export const fileRoutes = [
    {
        method: 'post',
        path: '/uploadFile',
        controller: fileController.uploadFile
    }
];















