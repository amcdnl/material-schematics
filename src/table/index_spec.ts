import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Tree } from '@angular-devkit/schematics';
import { baseApp } from '../utils/testing';
import { getFileContent } from '@schematics/angular/utility/test';

const collectionPath = path.join(__dirname, '../collection.json');

describe('material-table-schematic', () => {
  let runner: SchematicTestRunner;
  const options = {
    name: 'foo',
    path: 'app',
    sourceDir: 'src',
    inlineStyle: false,
    inlineTemplate: false,
    changeDetection: 'Default',
    styleext: 'css',
    spec: true,
    module: undefined,
    export: false,
    prefix: undefined,
    viewEncapsulation: undefined,
  };

  beforeEach(() => {
    runner = new SchematicTestRunner('schematics', collectionPath);
  });

  it('should create table files and add them to module', () => {
    const tree = runner.runSchematic('materialTable', { ...options }, baseApp());
    const files = tree.files;

    expect(files.indexOf('/src/app/foo/foo.component.css')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/src/app/foo/foo.component.html')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/src/app/foo/foo.component.spec.ts')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/src/app/foo/foo.component.ts')).toBeGreaterThanOrEqual(0);

    const moduleContent = getFileContent(tree, '/src/app/app.module.ts');
    expect(moduleContent).toMatch(/import.*Foo.*from '.\/foo\/foo.component'/);
    expect(moduleContent).toMatch(/declarations:\s*\[[^\]]+?,\r?\n\s+FooComponent\r?\n/m);
  });

  it('should add table imports to module', () => {
    const tree = runner.runSchematic('materialTable', { ...options }, baseApp());
    const moduleContent = getFileContent(tree, '/src/app/app.module.ts');

    expect(moduleContent).toContain('MatTableModule');
    expect(moduleContent).toContain('MatPaginatorModule');
    expect(moduleContent).toContain('MatSortModule');

    expect(moduleContent).toContain(`import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';`);
  });

});
