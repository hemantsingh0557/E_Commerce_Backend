import { fileService } from "../services/fileService.js";
import { createErrorResponse, createSuccessResponse } from "../utils/commonFunctions/responseUtils.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";
import { ERROR_TYPES } from "../utils/constants.js";

export const fileController = {};

fileController.uploadFile = async (payload) => {
    const { files } = payload;
    const result = await fileService.saveFile(files);

    if (result.message === RESPONSE_MESSAGE.NO_FILES_PROVIDED || result.message === RESPONSE_MESSAGE.FAILED_TO_UPLOAD_FILE) {
        return createErrorResponse(result.message, ERROR_TYPES.BAD_REQUEST);
    }

    return createSuccessResponse(result.message, { filePaths: result.data });
};
