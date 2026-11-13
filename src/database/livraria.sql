-- Script do banco da Livraria
-- Rode este arquivo inteiro no MySQL Workbench (raio ⚡).
-- Ele apaga e recria tudo: pode rodar de novo sempre que quiser começar do zero.
DROP DATABASE IF EXISTS livraria;

CREATE DATABASE livraria;

USE livraria;

-- A tabela categorias vem primeiro: a tabela livros aponta para ela.
CREATE TABLE
    categorias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(50) NOT NULL,
        descricao VARCHAR(200)
    );

CREATE TABLE
    livros (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(150) NOT NULL,
        autor VARCHAR(100) NOT NULL,
        preco DECIMAL(10, 2) NOT NULL,
        estoque INT NOT NULL,
        categoria_id INT,
        FOREIGN KEY (categoria_id) REFERENCES categorias (id)
    );

INSERT INTO
    categorias (nome, descricao)
VALUES
    (
        'Ficção',
        'Romances, fantasia e ficção científica'
    ),
    (
        'Tecnologia',
        'Programação, engenharia de software e afins'
    ),
    (
        'Infantil',
        'Literatura para crianças e jovens leitores'
    );

INSERT INTO
    livros (titulo, autor, preco, estoque, categoria_id)
VALUES
    ('Clean Code', 'Robert C. Martin', 89.90, 12, 2),
    ('Eloquent JavaScript', 'Marijn Haverbeke', 45.00, 20, 2),
    ('O Hobbit', 'J.R.R. Tolkien', 39.90, 8, 1),
    ('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 34.90, 10, 3),
    ('A Revolução dos Bichos', 'George Orwell', 29.90, 7, 1),
    ('O Guia do Mochileiro das Galáxias', 'Douglas Adams', 42.00, 6, 1),
    ('O Programador Pragmático', 'Andrew Hunt e David Thomas', 79.90, 5, 2),
    ('Banco de Dados para Iniciantes', 'Equipe Livraria', 54.90, 9, 2);

SELECT
    *
FROM
    livros
ORDER BY
    id;
