
import { LockedProductModel } from '../models/LockedProductModel.js';
import { restoreProductService } from '../services/restoreProductService.js';
import { TASK_EXECUTION_INTERVAL } from '../utils/constants.js';





const restoreExpiredLocks = async () => {
    try 
    {
        const locks = await LockedProductModel.find({ expiresAt: { $lt: new Date() } });
        for (const lock of locks) 
        {
            await restoreProductService.restoreLockedProducts(lock.userId);
        }
    } 
    catch (error) 
    {
        console.error("Error restoring expired locks:", error);
    }
};

setInterval(restoreExpiredLocks, TASK_EXECUTION_INTERVAL * 1000);







