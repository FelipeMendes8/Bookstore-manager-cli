
CREATE INDEX idx_livro_autor_livro_id ON livro_autor(livro_id);
CREATE INDEX idx_livro_autor_autor_id ON livro_autor(autor_id);

CREATE INDEX idx_emprestimo_cliente_id ON emprestimo(cliente_id);
CREATE INDEX idx_emprestimo_livro_id ON emprestimo(livro_id);
CREATE INDEX idx_emprestimo_funcionario_id ON emprestimo(funcionario_id);