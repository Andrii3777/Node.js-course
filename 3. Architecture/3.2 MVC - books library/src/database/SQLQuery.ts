export const SQLQuery = {
    insertImageQuery: `INSERT INTO image (data) VALUES (?)`,
    insertBookQuery: `INSERT INTO book (title, pages, year, description, imageId) VALUES (?, ?, ?, ?, ?)`,
    insertBookAuthorQuery: `INSERT INTO book_author (bookId, authorId) VALUES (?, ?)`,
    insertAuthorQuery: `INSERT INTO author (name) VALUES (?)`,
    incrementBookViewsQuery: `UPDATE book SET views = views + 1 WHERE id=?`,
    incrementBookWantedQuery: `UPDATE book SET wanted = wanted + 1 WHERE id=?`,
    checkFilledTablesQuery: `SELECT EXISTS (SELECT 1 FROM book_author) AS dataExists`,
    markBookAsDeletedQuery: `UPDATE book SET deleted = TRUE WHERE id=?`,
    getImageByIdQuery: `SELECT data FROM image WHERE id = ?`,
    getLastInsertIdQuery: `SELECT LAST_INSERT_ID() as id`,
    getAuthorIdByName: `SELECT id FROM author WHERE name = ?`,
    getAllBooksQuery: `
        SELECT
            b.id, b.title, b.pages, b.year, b.views, b.wanted,
            GROUP_CONCAT(a.name SEPARATOR ', ') AS author,
            b.description, b.imageId
        FROM
            book b
            JOIN book_author ba ON b.id = ba.bookId
            JOIN author a ON ba.authorId = a.id
        WHERE b.deleted = 0
        GROUP BY b.id;`,
    getSearchedBooksQuery: `
        SELECT
        b.id, b.title, b.pages, b.year, b.views, b.wanted,
        GROUP_CONCAT(a.name SEPARATOR ', ') AS author,
        b.description, b.imageId
        FROM
            book b
            JOIN book_author ba ON b.id = ba.bookId
            JOIN author a ON ba.authorId = a.id
        WHERE
            b.deleted = 0 AND
            (
                b.title LIKE ? OR
                CAST(b.year AS CHAR) LIKE ? OR
                CAST(b.pages AS CHAR) LIKE ? OR
                b.description LIKE ? OR
                a.name LIKE ?
            )
        GROUP BY b.id
        LIMIT ?
        OFFSET ?;`,
    getBookQuery: `
        SELECT
            b.id, b.title, b.pages, b.year, GROUP_CONCAT(a.name SEPARATOR ', ') AS author,
            b.description, b.imageId
        FROM
            book b
            JOIN book_author ba ON b.id = ba.bookId
            JOIN author a ON ba.authorId = a.id
        WHERE b.id = ? AND b.deleted = 0
        GROUP BY b.id;`,
    getBooksWithLimitOffsetQuery: `
        SELECT
            b.id, b.title, b.pages, b.year, b.views, b.wanted,
            GROUP_CONCAT(a.name SEPARATOR ', ') AS author,
            b.description, b.imageId
        FROM
            book b
            JOIN book_author ba ON b.id = ba.bookId
            JOIN author a ON ba.authorId = a.id
        WHERE b.deleted = 0
        GROUP BY b.id
        LIMIT ?
        OFFSET ?;`,
    getBooksNumber: `
        SELECT COUNT(DISTINCT b.id) AS book_count
        FROM
            book b
            JOIN book_author ba ON b.id = ba.bookId
            JOIN author a ON ba.authorId = a.id
            WHERE b.deleted = 0;`,
    getSearchedBooksNumberQuery: `
        SELECT COUNT(DISTINCT b.id) AS book_count
        FROM
            book b
            JOIN book_author ba ON b.id = ba.bookId
            JOIN author a ON ba.authorId = a.id
        WHERE
            b.deleted = 0 AND
            (
                b.title LIKE ? OR
                CAST(b.year AS CHAR) LIKE ? OR
                CAST(b.pages AS CHAR) LIKE ? OR
                b.description LIKE ? OR
                a.name LIKE ?
        );`
}