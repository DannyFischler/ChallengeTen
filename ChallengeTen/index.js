import inquirer from 'inquirer';
import { SVG } from '@svgdotjs/svg.js';
import fs from 'fs';

// Function to get user input using inquirer
async function getUserInput() {
    const questions = [
        {
            type: 'input',
            name: 'text',
            message: 'Enter text for the logo (up to 3 characters):',
            validate: input => input.length <= 3 ? true : "Text can be up to 3 characters only."
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter the color for the text:',
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['circle', 'triangle', 'square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter the color for the shape:',
        }
    ];

    return inquirer.prompt(questions);
}

function generateSVG({ text, textColor, shape, shapeColor }) {
    let shapeSVG = '';

    if (shape === 'circle') {
        shapeSVG = `<circle cx="150" cy="100" r="50" stroke="black" stroke-width="3" fill="${shapeColor}" />`;
    } else if (shape === 'square') {
        shapeSVG = `<rect width="100" height="100" style="fill:${shapeColor};stroke-width:3;stroke:black" />`;
    } else if (shape === 'triangle') {
        shapeSVG = `<polygon points="100,10 40,180 190,60" style="fill:${shapeColor};stroke:black;stroke-width:3" />`;
    }

    const textSVG = `<text x="150" y="100" fill="${textColor}" font-size="40" text-anchor="middle" dy=".3em">${text}</text>`;

    return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shapeSVG}
        ${textSVG}
    </svg>`;
}

// Function to save SVG string to file
function saveToFile(svgString) {
    fs.writeFileSync('logo.svg', svgString);
    console.log('Generated logo.svg');
}

// Main function to execute the application
async function main() {
    try {
        const userInput = await getUserInput();
        const svgString = generateSVG(userInput);
        saveToFile(svgString);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Execute main function
main();
