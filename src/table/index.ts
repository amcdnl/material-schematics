import { chain, Rule, noop, Tree, SchematicContext } from '@angular-devkit/schematics';
import { Schema } from './schema';
import componentSchematic from '@schematics/angular/component';
import { addModuleToModule } from '../utils/ast';

/**
 * Scaffolds a new table component.
 * Internally it bootstraps the base component schematic
 */
export default function(options: Schema): Rule {
  return chain([
    componentSchematic(options),
    options.skipImport ? noop() : addNavModulesToModule(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addNavModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = options.module;
    addModuleToModule(host, modulePath, 'MatTableModule', '@angular/material');
    addModuleToModule(host, modulePath, 'MatPaginatorModule', '@angular/material');
    addModuleToModule(host, modulePath, 'MatSortModule', '@angular/material');
  };
}
