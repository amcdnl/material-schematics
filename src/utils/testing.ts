import * as path from 'path';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

const collectionPath = path.join('./node_modules/@schematics/angular/collection.json');

export function baseApp() {
  const baseRunner = new SchematicTestRunner('schematics', collectionPath);
  return baseRunner.runSchematic('application', {
    directory: '',
    name: 'app',
    prefix: '',
    sourceDir: 'src',
    inlineStyle: false,
    inlineTemplate: false,
    viewEncapsulation: 'None',
    version: '1.2.3',
    routing: true,
    style: 'css',
    skipTests: false,
    minimal: false,
  });
}