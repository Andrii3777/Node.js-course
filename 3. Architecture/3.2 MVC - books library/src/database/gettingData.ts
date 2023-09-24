import { Request, Response } from 'express';
import { executeQuery } from './executeQuery';
import { Book } from '../models/models';
import { SQLQuery } from "./SQLQuery";
import env from '../config';
import escape from 'escape-html';

export async function getAllBooks(): Promise<Book[]> {
    const books = await executeQuery(SQLQuery.getAllBooksQuery);
    return escapeBooks(books);
}

export async function getBooksWithLimitOffset(offset: number): Promise<Book[]> {
    const books = await executeQuery(
        SQLQuery.getBooksWithLimitOffsetQuery,
        [env.MYSQL_LIMIT, offset]
    );
    return escapeBooks(books);
}

export async function getSearchedBooks(searchTerm: string, offset: number): Promise<Book[]> {
    const books = await executeQuery(
        SQLQuery.getSearchedBooksQuery,
        [...Array(5).fill(searchTerm), env.MYSQL_LIMIT, offset]
    );
    return escapeBooks(books);
}

export async function getBook(id: [number]): Promise<Book> {
    const books = await executeQuery(SQLQuery.getBookQuery, id);
    return (escapeBooks(books))[0];
}

export async function getBooksNumber(): Promise<number> {
    const booksNumber = await executeQuery(SQLQuery.getBooksNumber);
    const { book_count } = booksNumber[0];
    return book_count;
}

export async function getSearchedBooksNumber(searchTerm: string): Promise<number> {
    const booksSearchedNumber = await executeQuery(
        SQLQuery.getSearchedBooksNumberQuery,
        Array(5).fill(searchTerm)
    );
    return booksSearchedNumber[0]?.book_count;
}

export async function getImage(req: Request, res: Response) {
    try {
        const imageResult = await executeQuery(SQLQuery.getImageByIdQuery, [req.params.id]);

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageResult[0].data);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while retrieving image from the database.' });
    }
};

function escapeBooks(books: Book[]): Book[] {
    return books.map((book: Book) => {
        return {
            id: book.id,
            title: escape(book.title),
            pages: book.pages,
            year: book.year,
            views: book.views,
            wanted: book.wanted,
            author: escape(book.author),
            description: escape(book.description),
            imageId: book.imageId
        };
    });
}