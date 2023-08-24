import path from 'path';
import dump from 'mysqldump';
import { mysqlOptions } from '../database/MySQLConnect';

export async function backupDatabase() {
    try {
        await dump({
            connection: mysqlOptions,
            dumpToFile: path.join(__dirname, '../../mysql/backup.sql')
        });
        console.log('Backup created successfully.');
    } catch (error) {
        console.error('Error creating backup:', error);
    }
}