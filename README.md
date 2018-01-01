# Getting Started With Schematics
This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing
To test locally, install `@angular-devkit/schematics` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing
`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing
To publish, simply do:

```bash
npm run build
npm publish
```

### Notes
- `npm i -g @angular-devkit/schematics`
- `npm i -g @schematics/schematics`
- `schematics @schematics/schematics:schematic --name material-schematics`
- `cd material-schematics`
- `npm i`
- Testing: Specs
- Install in proj, `ng generate init --collection material-schematics`

Future: `ng add material` --> update pkg, run schematics, etc

### Examples
- https://github.com/angular/devkit/tree/master/packages/schematics/angular
- https://github.com/nrwl/nx/blob/master/packages/schematics/src/collection/ngrx/ngrx.spec.ts
