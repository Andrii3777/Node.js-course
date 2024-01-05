import { filmStub, updateFilmStub } from "../test/stubs/film.stub";

export const FilmsService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(filmStub()),
    getPage: jest.fn().mockResolvedValue([filmStub()]),
    findOne: jest.fn().mockResolvedValue(filmStub()),
    update: jest.fn().mockResolvedValue(updateFilmStub()),
    remove: jest.fn().mockResolvedValue({
        "raw": [],
        "affected": 1
    }),
})