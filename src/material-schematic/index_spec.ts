import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { getFileContent } from '@schematics/angular/utility/test';
import { baseApp } from '../utils/testing';
import { getConfig } from '@schematics/angular/utility/config';
import { getIndexPath } from '../utils/ast';

const collectionPath = path.join(__dirname, '../collection.json');

describe('scaffold-material-schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(() => {
    appTree = baseApp();
    runner = new SchematicTestRunner('schematics', collectionPath);
  });

  it('should update package.json', () => {
    const tree = runner.runSchematic('scaffold-material', {}, appTree);
    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));

    expect(packageJson.dependencies['@angular/material']).toBeDefined();
    expect(packageJson.dependencies['@angular/cdk']).toBeDefined();
  });

  it('should add default theme', () => {
    const tree = runner.runSchematic('scaffold-material', {}, appTree);
    const config = getConfig(tree);
    config.apps.forEach(app => {
      expect(app.styles).toContain('~@angular/material/prebuilt-themes/indigo-pink.css');
    })
  });

  fit('should add font links', () => {
    const tree = runner.runSchematic('scaffold-material', {}, appTree);
    const indexPath = getIndexPath(tree);
    const buffer = tree.read(indexPath);
    const indexSrc = buffer.toString();
    expect(indexSrc.indexOf('fonts.googleapis.com')).toBeGreaterThan(-1);
  });
});
