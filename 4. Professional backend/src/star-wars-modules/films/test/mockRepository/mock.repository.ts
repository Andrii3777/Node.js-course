import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { filmStub } from "../stubs/film.stub";

export const mockFilmRepository = {
    create: jest.fn().mockResolvedValue(filmStub()),
    save: jest.fn().mockResolvedValue(filmStub()),
    //find: jest.fn().mockResolvedValue([filmStub()]),
    //getPage: jest.fn().mockResolvedValue([filmStub()]),
    findOne: jest.fn().mockResolvedValue(filmStub()),
    delete: jest.fn().mockResolvedValue({
        "raw": [],
        "affected": 1
    }),
};

const createMockRepository = () => ({
    find: jest.fn().mockResolvedValue([]),
    findBy: jest.fn().mockResolvedValue([]),
});

export const mockUtilService = {
    getNextId: jest.fn().mockResolvedValue(1),
    returnEntitiesToUpdate: jest.fn().mockResolvedValue([]),
    updateFields: <T, V>(destination: V, source: T) => {
        for (const key in source) {
            if (destination.hasOwnProperty(key)) {
                (destination as any)[key] = source[key];
            }
        }
    },
};

export const mockPersonRepository = createMockRepository();
export const mockPlanetRepository = createMockRepository();
export const mockSpeciesRepository = createMockRepository();
export const mockVehicleRepository = createMockRepository();
export const mockStarshipRepository = createMockRepository();
export const mockImageRepository = createMockRepository();