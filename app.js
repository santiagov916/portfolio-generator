// // !!! the beginning text to take in data and pass it through to console it
// var profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);
// profileDataArgs = process.argv.slice(2);

// // ES6 feature: assignment destructuring
// const [name, github] = profileDataArgs;

// const { profile } = require('console');

const inquirer = require('inquirer');
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};

const promptProject = portfolioData => {

        portfolioData.projects = [];
        // if there's no 'projects' array property, create one
        if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project?'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of the project (Required)'
            },
            {
                type: 'checkbox',
                name: 'languages',
                message: ' What did you build this project with? (Check all that apply)',
                choices: [ 'Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node' ]
            },
            {
                type: 'input',
                name: 'link',
                message: 'Enter the Github link to your project. (Required)'
            },
            {
                type: 'confirm',
                name: 'feature',
                message: 'Would you like to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to enter another project?',
                default: false
            }
            
        ])
        // take this data above and push it to the projectData for storage then see if they want to add another project, if so do the same function again, if not just return the data to the portfolioData
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
    };

    promptUser()
    .then(promptProject)
    .then(projectAnswers => console.log(projectAnswers));
    
    // // call the fs module 
    // const fs = require('fs');
    
// // call the page-template
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// // call the fs method and insert three arguments : file name, where the data is coming from, and a call back (error) as the theird
// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err);

//     console.log('Portfolio complete! Check out index.html to see the output!')
// })



            // REFERENCE CODE !! //
// const printProfileData = profileDataArr => {
//     // This..
//     for (let i = 0; i < profileDataArr.length; i++) {
//         console.log(profileDataArr[i]);
//     }
//     console.log('============');

//     //Is the same as this..
//     profileDataArr.forEach((profileItem) => console.log(profileItem));
// };

// printProfileData(profileDataArgs);




