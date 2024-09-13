#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');

program
  .name('maitonui')
  .description('CLI to add components to your project')
  .version('1.0.0');

program
  .command('add <component>')
  .description('Add a component to your project')
  .action(async (component) => {
    try {
      await addComponent(component);
      console.log(`Successfully added ${component} to your project.`);
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

program.parse(process.argv);

async function addComponent(componentName) {
  const projectRoot = process.cwd();
  const isFirstTime = !fs.existsSync(path.join(projectRoot, 'app', 'frames', 'lib', 'utils.ts'));

  if (isFirstTime) {
    await setupFirstTime(projectRoot);
  }

  await copyComponentFile(componentName, projectRoot);
}

async function setupFirstTime(projectRoot) {
  // Install dependencies
  console.log('Installing dependencies...');
  await executeCommand('npm install class-variance-authority tailwind-merge');

  // Copy utils.ts file
  const sourceUtilsPath = path.join(__dirname, '..', 'lib', 'utils.ts');
  const destUtilsPath = path.join(projectRoot, 'app', 'frames', 'lib', 'utils.ts');
  
  if (!fs.existsSync(sourceUtilsPath)) {
    throw new Error('utils.ts file not found in the source directory.');
  }

  await fs.copy(sourceUtilsPath, destUtilsPath);
  console.log('Copied utils.ts file to your project.');
}

async function copyComponentFile(componentName, projectRoot) {
  const sourceComponentPath = path.join(__dirname, '..', 'components', `${componentName}.tsx`);
  const destComponentPath = path.join(projectRoot, 'app', 'frames', 'components', `${componentName}.tsx`);
  
  if (!fs.existsSync(sourceComponentPath)) {
    throw new Error(`Component ${componentName} not found.`);
  }

  await fs.copy(sourceComponentPath, destComponentPath);
  console.log(`Copied ${componentName}.tsx to your project.`);
}

async function executeCommand(command) {
  const { exec } = require('child_process');
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
}