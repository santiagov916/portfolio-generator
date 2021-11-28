// // // !!! the beginning text to take in data and pass it through to console it
// var profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);
// profileDataArgs = process.argv.slice(2);

// // ES6 feature: assignment destructuring
// const [name, github] = profileDataArgs;

// const { profile } = require('console');

const inquirer = require('inquirer');

// // call the page-template
const generatePage = require('./src/page-template.js');

const {writeFile, copyFile } = require('./utils/generate-site.js');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your Github username!');
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
    `);

        // if there's no 'projects' array property, create one
        if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project?',
                validate: projectName => {
                    if (projectName) {
                        return true;
                    } else {
                        console.log('Please enter a project name!')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of the project (Required)',
                validate: projectDescription => {
                    if (projectDescription) {
                        return true;
                    } else {
                        console.log('Please enter a project description!')
                        return false; 
                    }
                }
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
                message: 'Enter the Github link to your project. (Required)',
                // this makes sure that they have to enter something in
                validate: githubLink => {
                    if (githubLink) {
                        return true;
                    } else {
                        console.log('Please enter a Github link')
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to enter some information about yourself for an "About" section?',
                default: true
            },
            {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself:',
                // This triggers "WHEN" cofirmAbout is selected from the question above
                when: ({ confirmAbout }) => {
                    if (confirmAbout) {
                        return true;
                    } else {
                        return false;
                    }
                }
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


    // the updated template uploader
    promptUser()
    .then(promptProject)
    .then(portfolioData => {
      return generatePage(portfolioData);
    })
    .then(pageHTML => {
      return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
      console.log(writeFileResponse);
      return copyFile();
    })
    .then(copyFileResponse => {
      console.log(copyFileResponse);
    })
    .catch(err => {
      console.log(err);
    });

    // the old template uploader (call back hell)
    // promptUser()
    // .then(promptProject)
    // .then(portfolioData => {
    //     const pageHTML = generatePage(portfolioData);

    //     // // call the fs method and insert three arguments : file name, where the data is coming from, and a call back (error) as the theird
    //     fs.writeFile('./dist/index.html', pageHTML, err => {
    //         if (err) {
    //             console.log(err)
    //             return;
    //         }
    //       console.log('Page created! Check out index.html in this directory to see it!');

    //       fs.copyFile('./src/style.css', './dist/style.css', err => {
    //           if (err) {
    //               console.log(err);
    //               return;
    //           }
    //           console.log('Style sheet copied successfully!')
    //       });
    //     });
    // });


// const pageHTML = generatePage(name, github);

// // call the fs method and insert three arguments : file name, where the data is coming from, and a call back (error) as the theird
// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err);





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


