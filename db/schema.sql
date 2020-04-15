
DROP DATABASE IF EXISTS company_db;


CREATE DATABASE company_db;

USE company_db;


CREATE TABLE employee (

    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE  role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(5,2),
    department_id INT, 
   FOREIGN KEY(role_id)

);

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);


