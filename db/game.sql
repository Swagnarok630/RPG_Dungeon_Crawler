DROP DATABASE IF EXISTS game_db;

CREATE DATABASE game_db;

USE game_db;

CREATE TABLE maps (
    id INT NOT NULL AUTO_INCREMENT
    PRIMARY KEY (id)
)

CREATE TABLE characters (
    id INT NOT NULL AUTO_INCREMENT
    archtype varchar(50) NOT NULL
    PRIMARY KEY (id)
)

CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT
    potion varchar(50) NOT NULL
    PRIMARY KEY (id)
)

CREATE TABLE enemies (
    id INT NOT NULL AUTO_INCREMENT
    minion varchar(50) NOT NULL
    PRIMARY KEY (id)
)