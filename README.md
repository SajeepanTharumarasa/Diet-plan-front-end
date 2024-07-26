# Diet Plan Web

### Dev Guide

Prefer yarn over npm! use `yarn add ...` instead of `npm i ... --save` to add new packages

### Code Style

Styling rules are defined in `.prettierrc.js`
At the time you commit the code, the linter will run and output any errors. Please fix all before committing. But you can setup VS Code to lint dynamically.

#### Setup VS Code for dynamic linting

1. First, install the ESLint command-line tool. `npm install -g eslint`
2. Then, install the [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) in VS Code
3. Type `yarn lint:fix` or `yarn format` to format the code and fix the lint issues.

### Setup development environment

• Clone the repository.<br/>
• cd into root directory.<br/>
• Type `yarn install`.<br/>
• Type `yarn start`.<br/>
• Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for development environment

• Clone the parent repository.<br/>
• cd into root directory.<br/>
• Type `yarn install`.<br/>
• Type `yarn run build`.<br/>

### Build for production environment

• Clone the parent repository.<br/>
• cd into root directory.<br/>
• Type `yarn install`.<br/>
• Type `yarn run build-prod`.<br/>
