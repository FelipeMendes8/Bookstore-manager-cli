-- ============================================================
-- SEED — Loja Virtual (v2)
-- Dados de exemplo para todas as tabelas
-- ⚠️  Apenas para desenvolvimento/teste
-- ============================================================

-- Limpa todos os dados e reinicia as sequências

TRUNCATE TABLE
    emprestimo,
    livro_autor,
    livro,
    autor,
    cliente,
    funcionario
RESTART IDENTITY CASCADE;

-- A senha a baixo corresponde a: 123321
INSERT INTO funcionario (nome, email, senha, matricula, ativo) VALUES 
('Admin', 'admin@gmail.com', '$2b$10$2MMvSLQcF274F3ni6KrilOYfWaR07hFYvK2zF8XWjXPPjVLlLZUjG', 'FUNC01', 1);

INSERT INTO livro (titulo,isbn,qtd_total,disponiveis,ativo) VALUES
('Linux para leigos', '11111', 10, 10, 1),
('Python 3 conceitos', '22222', 10, 10, 1),
('Código limpo', '33333', 10, 10, 1),
('Entendendo algoritmos', '44444', 10, 10, 1),
('Java como programar', '55555', 10, 10, 1);

INSERT INTO autor (nome, ativo) VALUES
('Richard Blum', 1),
('Sérgio Luiz Banin',1),
('Robert C. Martin',1),
('Aditya Bhargava',1),
('Paul Deitel',1),
('Harvey Deitel',1);

INSERT INTO livro_autor (livro_id, autor_id) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(5,6);

INSERT INTO cliente (nome, email, ativo) VALUES
('Felipe', 'felipe@gmail.com', 1),
('Jose','jose@gmail.com', 1),
('Maria', 'maria@gmail.com', 1),
('Pedro', 'pedro@gmail.com', 1),
('Joana', 'joana@gmail.com', 1);