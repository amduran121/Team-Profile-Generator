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
  function addIntern() {
    console.log("Enter information for your interns");
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "Input intern(s) name(s)",
        },
        {
          name: "internId",
          message: "Input interns ID",
        },
        {
          name: "internEmail",
          message: "Input interns email",
        },
        {
          name: "internSchool",
          message: "Input intern's school",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
      });
  }
  function addEngineer() {
    console.log("Enter information for your engineer");
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "Input engineer's name",
        },
        {
          name: "engineerId",
          message: "Input engineer ID",
        },
        {
          name: "engineerEmail",
          message: "Input engineer email",
        },
        {
          name: "engineerGitHub",
          message: "Enter engineer's gitHub",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGitHub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }
  function buildSite() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(OUTPUT_PATH, render(teamMembers), "utf-8");
  }
  function createTeam() {
    //inquirer prompt what type of team member to add, after that we need a .then to assess the user choice, and inside of that .then we will write a switch case, and depending on response we will add engineer or intern or create the site.
    var inquirer = require("inquirer");
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeType",
          message: "What type of employee would you like to add",
          choices: ["Engineer", "Intern", "No more employees"],
        },
      ])
      .then((answer) => {
        console.log(answer);
        switch (answer.employeeType) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
          default:
            buildSite();
            break;
        }
      });
  }
  createManager();
}

app();
