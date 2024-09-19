#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

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

  await copyComponentWithDependencies(componentName, projectRoot);
}

async function copyComponentWithDependencies(componentName, projectRoot) {
  const copiedComponents = new Set();

  async function copyRecursively(component) {
    if (copiedComponents.has(component)) {
      return;
    }

    const destComponentPath = path.join(projectRoot, 'app', 'frames', 'components', `${component}.tsx`);
    
    if (!fs.existsSync(destComponentPath)) {
      await copyComponentFile(component, projectRoot);
      copiedComponents.add(component);

      const dependencies = await detectDependencies(component);
      for (const dep of dependencies) {
        await copyRecursively(dep);
      }
    } else {
      console.log(`Component ${component} already exists, skipping.`);
    }
  }

  await copyRecursively(componentName);
}

async function detectDependencies(componentName) {
  const sourceComponentPath = path.join(__dirname, '..', 'components', `${componentName}.tsx`);
  const content = await fs.readFile(sourceComponentPath, 'utf-8');

  const ast = parser.parse(content, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });

  const dependencies = new Set();

  traverse(ast, {
    ImportDeclaration(path) {
      const importPath = path.node.source.value;
      if (importPath.startsWith('./')) {
        const dependency = importPath.slice(2).replace(/\.tsx?$/, '');
        dependencies.add(dependency);
      }
    }
  });

  return Array.from(dependencies);
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