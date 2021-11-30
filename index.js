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
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "Input manager's name",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "You must enter at least one character"
        },
      },
      {
          name: "managerId",
          message: "Input manager's ID number"
        
      },
      {
          name: "managerEmail",
          message: "Input manager's email address"
      },
      {
          name: "managerOfficeNumber",
          message: "Input manager's Office Number"
      }
    ])
    .then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
        teamMembers.push(manager)
        idArray.push(answers.managerId)
        createTeam()
        
    })
  }
  function createTeam() {
    //inquirer prompt what ktype of team member to add, after that we need a .then to assess the user choice, and inside of that .then we will write a switch case, and depening on response we will add engineer or intern or create the site.      
}
  createManager();
}

app();
