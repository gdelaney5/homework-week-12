var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "maui",
    database: "company_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as ID: " + connection.threadId);
    runSearch();
});


function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees",
                "View Employees by Department",
                "View Employees by Role",
                "Add Department",
                "Add Employee",
                "Add Roles",
                "Update Employee Roles",
                "Exit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
            case "View All Employees":
                employeeSearch();
                break;

            case "View Employees by Department":
                employeeByDeptSearch();
                break;

            case "View Employees by Role":
                employeeByRoleSearch();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Roles":
                addRoles();
                break;
            
            case "Update Employees Roles":
                updateRoles();
                break;
            
            case "Exit":
                connection.end();
                break;
            }
        });
}

function employeeSearch() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].employee + " | " + res[i].department + " | " + res[i].role);
        }
        console.log("-----------------------------------");
    });
}

function employeeByDeptSearch() {
    inquirer
        .prompt({
            name: "employee",
            type: "input",
            message: "What Department would you like to search?"
        })
        .then(function(answer) {
            var query = "SELECT employee FROM department WHERE ?";
            connection.query(query, { department: answer.department }, function(err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log("Employee: " + res[i].employee + " || Department: " + res[i].department + " || Role: " + res[i].role);
                }
                runSearch();
            });
        });
}
