const mysql = require("mysql");
const conTable = require('console.table');

const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: "localhost",


    port: 3306,


    user: "root",

    password: "password",
    database: "company_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() {
    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "start",
            choices: [
                "Add Employee",
                "View all Employees",
                "Remove Employee",
                "Add Department",
                "View all Departments",
                "Add Roles",
                "View all Roles",
                "Update Employee Role",
                "Exit"
            ]
        }])
        .then(function (res) {
            switch (res.start) {

                case "Add Employee":
                    addEmployee();
                    break;

                case "View all Employees":
                    viewAllEmployees();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Add Department":
                    addDept();
                    break;

                case "View all Departments":
                    viewAllDept();
                    break;

                case "Add Roles":
                    addRole();
                    break;

                case "View all Roles":
                    viewAllRoles();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function addEmployee() {
    console.log("Adding new Employee. \n");

    inquirer.prompt([{
            type: "input",
            meassage: "First Name",
            name: "first_name"
        },
        {
            type: "input",
            meassage: "Last Name",
            name: "last_name"


        },
        {
            type: "list",
            meassage: "What is the employee's role",
            name: "role_id",
            choices: [1, 2, 3]
        }
    ]).then(function (res) {
        const query = connection.query(
            "INSERT INTO empoloyee ?",
            [res],
            function (err, res) {
                if (err) throw err;
                console.log("Employee added!\n");

                start();
            }

        );
    });

}


function viewAllEmployees() {

    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        console.log('EMPLOYEES:');
        res.forEach(employee => {
            console.table(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);

        });
        start();
    });
}
    //Bonus
// function removeEmployee() {}

function addDept() {
    inquirer
        .prompt([{
            type: "input",
            name: "deptName",
            message: "What Department would you like to add?"
        }])
        .then(function (res) {
            console.log(res);
            const query = connection.query(
                "INSERT INTO department SET ?",
                [res],
                function (err, res) {
                    connection.query("SELECT * FROM department", function (err, res) {
                        console.table(res);
                        start();
                    });
                }
            )
        });
}

function viewAllDept() {
    connection.query("SELECT * FROM department", function (err, res) {
        console.table(res);
        start();
    });

}

function addRole() {
    inquirer
.prompt([
  {
    type: "input", 
    name: "title",
    message: "What role would you like to add?"
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary for the role?"
  },
  {
    type: "list",
    name: "department",
    message: "what department?",
  }
])
.then (function(res){
  console.log(res); 
  const query = connection.query(
    "INSERT INTO roles SET ?",
   [], 
    function (err, res){
      if (err) throw err;
      //const id = res.insertId;
      start(); 
    }
  );
});
}

function viewAllRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        console.table(res);
        start();
    });

}

function updateEmployeeRole() {}