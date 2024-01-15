import { pool } from './MySQLConnect';
import fs from 'fs';
import path from 'path';

/**
 * Reads an SQL file, splits it into individual queries, and executes them.
 * @param sqlFileName the name of the SQL file to be executed
 * @param fillData an optional parameter.
 */
export async function executeSQLFile(sqlFileName: string, fillData: any = null) {
    try {
        const sqlFilePath = path.join(__dirname, '../../mysql/');
        const data = await fs.promises.readFile(sqlFilePath + sqlFileName, 'utf8');
        const queries = data.split(';').filter(query => query.trim() !== '');

        for (const query of queries) {
            await executeQuery(query, fillData ?? undefined);
        }
    } catch (error) {
        console.error({ error: 'An error occurred while executing SQL file: ' +  sqlFileName});
    }
}

export function executeQuery(query: string, params?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, result, fields) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}