# Getting Started With Schematics
This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Running
- `npm i material-schematics --D`
- `ng generate materialShell --collection material-schematics`
- `ng generate materialNav --collection material-schematics`
- `ng generate materialTable --collection material-schematics`
- `ng generate materialDashboard --collection material-schematics`

### Testing
To test locally, install `@angular-devkit/schematics` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

### Unit Testing
`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Notes
- `npm i -g @angular-devkit/schematics`
- `npm i -g @schematics/schematics`
- `schematics @schematics/schematics:schematic --name material-schematics`
- `cd material-schematics`
- `npm i`
- `ng generate init --collection material-schematics`

Future: `ng add material` --> update pkg, run schematics, etc

### Examples
- https://github.com/angular/devkit/tree/master/packages/schematics/angular
- https://github.com/nrwl/nx/blob/master/packages/schematics/src/collection/ngrx/ngrx.spec.ts

### Recommendations
- Expose `addDeclarationToNgModule` from `@schematics/angular/component`
- Expose function to add npm packages to `package.json`
- Add function to easily get a base app for testing
- Add function to easily get the root app module
- Easier way to scaffold a component
