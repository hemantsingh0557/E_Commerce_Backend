import { RESPONSE_MESSAGE } from "../utils/messages.js";

export const fileService = {}; 

fileService.saveFile = async (files) => {
    // Check if files are provided and non-empty
    if (!files || files.length === 0) {
        return { message: RESPONSE_MESSAGE.NO_FILES_PROVIDED, data: null };
    }

    // Extract file paths
    const filePaths = files.map(file => file.path);
    
    // Check if any file path is null
    if (filePaths.some(path => path === null)) {
        return { message: RESPONSE_MESSAGE.FAILED_TO_UPLOAD_FILE, data: null };
    }

    return { message: RESPONSE_MESSAGE.FILE_UPLOADED_SUCCESSFULLY, data: filePaths };
};
