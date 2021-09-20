
use biblioteca;

create table if not exists livros(
id_livro int not null primary key auto_increment,
nome varchar(40),
autor varchar(40),
categoria varchar(30)
);
