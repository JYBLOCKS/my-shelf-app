DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS my_shelf;

-- 3) Ensure UUID generator is available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT NOT NULL,
    gender VARCHAR(50) NOT NULL,
    published_date DATE,
    isbn VARCHAR(20) UNIQUE,
    pages INT,
    cover_url TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    language VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    avatar_url TEXT,
    name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INT,
    reviews INT DEFAULT 0,
    likes INT DEFAULT 0,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID,
    user_id UUID,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    book_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE my_shelf (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    books UUID[],
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE reviews ADD CONSTRAINT fk_reviews_books FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE;
ALTER TABLE reviews ADD CONSTRAINT fk_reviews_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE likes ADD CONSTRAINT fk_likes_books FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE;
ALTER TABLE likes ADD CONSTRAINT fk_likes_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE my_shelf ADD CONSTRAINT fk_my_shelf_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

CREATE INDEX idx_books_gender ON books(gender);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_title ON books(title);

INSERT INTO users VALUES
('admin', 'admin@admin.com', 'admin', 'admin', 'admin', 30);
