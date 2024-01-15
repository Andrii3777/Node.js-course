import { Request, Response } from 'express';
import { executeQuery, executeSQLFile } from '../database/executeQuery';
import { getAllBooks } from '../database/gettingData';
import { SQLQuery } from "../database/SQLQuery";
import { generateCSRFToken, validateCSRFToken } from '../util/csrf';
import env from '../config';
import escape from 'escape-html';

export async function getAdminPage(req: Request, res: Response) {
    try {
        const csrfToken = generateCSRFToken();
        res.cookie('XSRF-TOKEN', csrfToken);

        res.render('admin-page', {
            apiVersion: env.API_VERSION,
            books: await getAllBooks(),
            csrfToken
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while getting the admin page.' });
    }
};

export async function addBook(req: Request, res: Response) {
    validateCSRFToken(req, res);

    const imageData = req.file?.buffer;
    const { title, pages, year, authors, description } = req.body;

    try {
        const image = await executeQuery(SQLQuery.insertImageQuery, [imageData]);
        const book = await executeQuery(SQLQuery.insertBookQuery,
            [escape(title), pages, year, escape(description), image.insertId]
        );
        authors.forEach(async (author: string) => {
            const insertedAuthorId = await insertAuthorAndGetId(escape(author));
            await executeQuery(SQLQuery.insertBookAuthorQuery, [book.insertId, insertedAuthorId]);
        });

        res.redirect(`/admin/api/v${env.API_VERSION}/`);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the book.' });
    }
};

export async function markBookAsDeleted(req: Request, res: Response) {
    try {
        await executeQuery(SQLQuery.markBookAsDeletedQuery, [req.params.id]);
        res.status(200).json('Book deleted successfully!');
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while marking the book as deleted.' });
    }
};

export async function deleteBooks() {
    try {
        await executeSQLFile('deleteBooks.sql');
        console.log('Soft deletions cleanup completed.');
    } catch (error) {
        console.error({ error: 'An error occurred while deleting the book.' });
    }
};

export async function logout(req: Request, res: Response) {
    res.status(401).send('Logged out');
};

async function insertAuthorAndGetId(authorName: string): Promise<number | null> {
    try {
        const [existingAuthor] = await executeQuery(SQLQuery.getAuthorIdByName, [authorName]);

        if (existingAuthor) return existingAuthor.id;

        return (await executeQuery(SQLQuery.insertAuthorQuery, [authorName])).insertId;
    } catch (error) {
        console.error({ error: 'An error occurred while inserting author  and getting id.' });
        return null;
    }
}