import cron from 'node-cron';
import { deleteBooks } from '../controllers/admin';
import { backupDatabase } from '../util/backup';

export function runCron() {
    // */10 * * * * * - each 10 seconds
    // 0 1 * * * - each day at 1:00 a.m.
    cron.schedule('0 1 * * *', async () => {
        await deleteBooks();
        await backupDatabase();
    });
}