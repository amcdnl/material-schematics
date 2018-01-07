import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Tree } from '@angular-devkit/schematics';
import { baseApp } from '../utils/testing';
import { getFileContent } from '@schematics/angular/utility/test';

const collectionPath = path.join(__dirname, '../collection.json');

describe('material-nav-schematic', () => {
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

  fit('should create nav files and add them to module', () => {
    const tree = runner.runSchematic('materialNav', { ...options }, baseApp());
    const files = tree.files;

    expect(files.indexOf('/src/app/foo/foo.component.css')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/src/app/foo/foo.component.html')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/src/app/foo/foo.component.spec.ts')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/src/app/foo/foo.component.ts')).toBeGreaterThanOrEqual(0);

    const moduleContent = getFileContent(tree, '/src/app/app.module.ts');
    expect(moduleContent).toMatch(/import.*Foo.*from '.\/foo\/foo.component'/);
    expect(moduleContent).toMatch(/declarations:\s*\[[^\]]+?,\r?\n\s+FooComponent\r?\n/m);
  });

  it('should add nav imports to module', () => {
    const tree = runner.runSchematic('materialNav', { ...options }, baseApp());
    const moduleContent = getFileContent(tree, '/src/app/app.module.ts');

    expect(moduleContent).toContain('LayoutModule');
    expect(moduleContent).toContain('MatToolbarModule');
    expect(moduleContent).toContain('MatButtonModule');
    expect(moduleContent).toContain('MatSidenavModule');
    expect(moduleContent).toContain('MatIconModule');
    expect(moduleContent).toContain('MatListModule');

    expect(moduleContent).toContain(`import { LayoutModule } from '@angular/cdk/layout';`);
    expect(moduleContent).toContain(`import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';`);
  });

});
