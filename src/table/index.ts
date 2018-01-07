import { chain, Rule, noop, Tree, SchematicContext, externalSchematic } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { addToModule } from '../utils/ast';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';

/**
 * Scaffolds a new table component.
 * Internally it bootstraps the base component schematic
 */
export default function(options: Schema): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', options),
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
