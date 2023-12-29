CREATE TABLE IF NOT EXISTS image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data LONGBLOB DEFAULT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS author (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT,
    year INT,
    pages INT,
    description TEXT,
    views INT DEFAULT 0,
    wanted INT DEFAULT 0,
    deleted BOOLEAN DEFAULT FALSE,
    imageId INT,
    FOREIGN KEY (imageId) REFERENCES image(id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS book_author (
    bookId INT,
    authorId INT,
    FOREIGN KEY (bookId) REFERENCES book(id),
    FOREIGN KEY (authorId) REFERENCES author(id)
) ENGINE = InnoDB;