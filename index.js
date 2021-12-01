const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "team.html");
const render = require("./src/pageTemplate");
const teamMembers = [];
const idArray = [];

function app() {
  function createManager() {
    console.log("Enter information to build your team");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "Input manager's name",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "You must enter at least one character";
          },
        },
        {
          name: "managerId",
          message: "Input manager's ID number",
        },
        {
          name: "managerEmail",
          message: "Input manager's email address",
        },
        {
          name: "managerOfficeNumber",
          message: "Input manager's Office Number",
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
          }
  function Intern() {
    console.log("Enter information for your interns");
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "Input intern(s) name(s)",
      },
      {
        name: "internId",
        message: "Input interns name",
      },
      {
        name: "internEmail",
        message: "Input interns email",
      },
       .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
    ]);
    
  }
   function Employee() {
     console.log("Enter information for your interns");
     inquirer.prompt([
       {
         type: "input",
         name: "employee name",
         message: "Input employee(s) name(s)",
       },
       {
         name: "employeeId",
         message: "Input interns ID number",
       },
       {
         name: "employeeEmail",
         message: "Input employees email",
       },
     ]);
   }

  function createTeam() {
    //inquirer prompt what type of team member to add, after that we need a .then to assess the user choice, and inside of that .then we will write a switch case, and depending on response we will add engineer or intern or create the site.
    var inquirer = require("inquirer");
    inquirer.prompt([
      {
        type: "input",
        name: "numEmployees",
        message: "Enter number of employees",
      },
      {
        name: "numEngineers",
        message: "Enter number of engineers",
      },
      {
        name: "numInterns",
        message: "Enter number of interns",
      },

      // .then(answers => {
      //   const createTeam = new
      // })
    ]);
  }
  createManager();
}

app();
