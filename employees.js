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
        })

}