use mercado;

drop table produtos;

create table if not exists produtos(
id_produto int not null primary key auto_increment,
nome_produto varchar(40) not null,
marca_produto varchar(40) not null,
codigo_categoria varchar(40) not null,
quantidade varchar(40) not null
);
