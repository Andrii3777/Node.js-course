import fs from 'fs';
import { executeQuery, executeSQLFile } from './executeQuery';
import path from 'path';
import { SQLQuery } from "./SQLQuery";

export function createAndFillTables() {
    (async () => {
        await createTables();
        await fillTables();
    })();
};

async function createTables() {
    await executeSQLFile('createTables.sql');
};

async function fillTables() {
    if (!await areTablesFilled()) {
        await executeSQLFile('fillImageTable.sql', createImgArr());
        await executeSQLFile('fillTables.sql');
    }
};

async function areTablesFilled(): Promise<boolean> {
    const result = await executeQuery(SQLQuery.checkFilledTablesQuery);
    return result[0].dataExists === 1;
}

function createImgArr(): any[] {
    const seedPath = path.join(__dirname, '../../seeds/images');
    const images = [];

    try {
        const imageNames = fs.readdirSync(seedPath);

        for (const imageName of imageNames) {
            try {
                const image = fs.readFileSync(path.join(seedPath, imageName));
                images.push([image]);
            } catch (error) {
                console.error(`Error reading ${imageName}:`, error);
            }
        }

        return [images];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
