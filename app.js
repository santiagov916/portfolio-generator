// // !!! the beginning text to take in data and pass it through to console it
// var profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);
// profileDataArgs = process.argv.slice(2);

// // ES6 feature: assignment destructuring
// const [name, github] = profileDataArgs;

// const { profile } = require('console');


const inquirer = require('inquirer');
inquirer
.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    }
])
.then(answers => console.log(answers));

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




