import { Request, Response } from 'express';
import { getBooksWithLimitOffset, getSearchedBooks, getBook, getBooksNumber, getSearchedBooksNumber } from '../database/gettingData';
import { executeQuery } from '../database/executeQuery';
import { SQLQuery } from '../database/SQLQuery';
import env from '../config';
import escape from 'escape-html';

export async function getBooksPage(req: Request, res: Response) {
    let searchTerm = req.query.search;
    const offsetParam = Number(req.query.offset);
    let offset = (isNaN(offsetParam) || offsetParam < 0) ? 0 : offsetParam;

    try {
        if (searchTerm) {
            searchTerm = escape(String(searchTerm));
            await renderSearchedBooksPage(res, searchTerm, offset);
        } else {
            await renderBooksPage(res, offset);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while getting the books page.' });
    }
};

export async function getBookPage(req: Request, res: Response) {
    const id = isNaN(Number(req.params.id)) ? 0 : Number(req.params.id);

    try {
        await executeQuery(SQLQuery.incrementBookViewsQuery, [id]);

        res.render('book-page', {
            apiVersion: env.API_VERSION,
            book: await getBook([id])
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while getting the book page.' });
    }
};

export async function incrementBookWanted(req: Request, res: Response) {
    try {
        await executeQuery(SQLQuery.incrementBookWantedQuery, [req.params.id]);
        res.status(200).json('Incremented book wanted successfully!');
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while incrementing book wanted.' });
    }
};

async function renderSearchedBooksPage(res: Response, searchTerm: string, offset: number) {
    res.render('books-page', {
        apiVersion: env.API_VERSION,
        offsetStep: env.MYSQL_OFFSET,
        books: await getSearchedBooks('%' + searchTerm + '%', offset),
        offset,
        booksNumber: undefined,
        booksSearchedNumber: await getSearchedBooksNumber('%' + searchTerm + '%'),
        searchTerm
    });
}

async function renderBooksPage(res: Response, offset: number) {
    res.render('books-page', {
        apiVersion: env.API_VERSION,
        offsetStep: env.MYSQL_OFFSET,
        books: await getBooksWithLimitOffset(offset),
        offset,
        booksNumber: await getBooksNumber(),
        booksSearchedNumber: undefined,
        searchTerm: undefined
    });
}
