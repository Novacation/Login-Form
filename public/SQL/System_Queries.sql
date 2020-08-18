create database registro;

use registro;

create table if not exists clientes(
clientId int auto_increment not null primary key,
clientLogin varchar(18) not null unique,
clientPassword varchar(100) not null
);


create table if not exists photoscomments(
	commentId int auto_increment not null primary key,
    clientComment varchar(50) not null,
    clientId int not null,
    FOREIGN KEY (clientId) REFERENCES clientes(clientId)
);


create table if not exists newscomments(
	commentId int auto_increment not null primary key,
    clientComment varchar(50) not null,
    clientId int not null,
    FOREIGN KEY (clientId) REFERENCES clientes(clientId)
);