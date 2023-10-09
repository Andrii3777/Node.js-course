DELETE FROM book_author WHERE bookId IN (SELECT id FROM book WHERE deleted = TRUE);
DELETE FROM book WHERE deleted = TRUE;
DELETE FROM image WHERE id NOT IN (SELECT DISTINCT imageId FROM book);
DELETE FROM author WHERE id NOT IN (SELECT DISTINCT authorId FROM book_author);