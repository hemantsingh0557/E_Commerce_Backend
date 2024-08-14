import cron from "node-cron";
import { TASK_EXECUTION_INTERVAL } from "../../utils/constants.js"; 
import { restoreProductService } from "../../services/restoreProductService.js";
import { LockedProductModel } from "../../models/LockedProductModel.js";

export const startCronJobs = async() => {
    try {
        cron.schedule(`*/${TASK_EXECUTION_INTERVAL} * * * * *`, async() => {
            console.log("Running restore expired locks job");
            await restoreExpiredLocks();
        });
        console.log("Cron jobs initialized successfully");
    } catch (error) {
        console.error("Error initializing cron jobs:", error);
    }
};

export const restoreExpiredLocks = async() => {
    try {
        const locks = await LockedProductModel.find({ expiresAt: { $lt: new Date() } });
        for (const lock of locks) {
            await restoreProductService.restoreLockedProducts(lock.userId);
        }
        console.log("Expired locks restored successfully");
    } catch (error) {
        console.error("Error restoring expired locks:", error);
    }
};
