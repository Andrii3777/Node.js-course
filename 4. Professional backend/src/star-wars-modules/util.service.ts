import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';

@Injectable()
export class UtilService {
    constructor() { }

    updateFields<T, V>(destination: V, source: T) {
        for (const key in source) {
            if (destination.hasOwnProperty(key)) {
                (destination as any)[key] = source[key];
            }
        }
    }

    async returnEntitiesToUpdate(ids: number | number[], repository: Repository<any>) {
        if (!ids) return;

        const results = await (Array.isArray(ids)
            ? repository.findBy({ id: In(ids) })
            : repository.findOneBy({ id: ids }));

        if (!results) throw new NotFoundException(`Entity with ID ${ids} not found`);

        return results;
    }

    async getNextId(repository: Repository<any>, tableName: string): Promise<number> {
        const { maxId } = await repository
            .createQueryBuilder(tableName)
            .select(`MAX(${tableName}.id)`, 'maxId')
            .getRawOne();

        return maxId ? maxId + 1 : 1;
    }
}
