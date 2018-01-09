import { chain, Rule, noop, Tree, SchematicContext } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { addToModule } from '../utils/ast';
import { findModuleFromOptions } from '../utils/devkit-utils/find-module';
import { buildComponent } from '../utils/devkit-utils/component';

/**
 * Scaffolds a new table component.
 * Internally it bootstraps the base component schematic
 */
export default function(options: Schema): Rule {
  return chain([
    buildComponent({ ...options }),
    options.skipImport ? noop() : addNavModulesToModule(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addNavModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options);
    addToModule(host, modulePath, 'MatTableModule', '@angular/material');
    addToModule(host, modulePath, 'MatPaginatorModule', '@angular/material');
    addToModule(host, modulePath, 'MatSortModule', '@angular/material');
    return host;
  };
}
