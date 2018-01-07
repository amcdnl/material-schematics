import { chain, Rule, noop, Tree, SchematicContext } from '@angular-devkit/schematics';
import { Schema } from './schema';
import componentSchematic from '@schematics/angular/component';
import { addModuleToModule } from '../utils/ast';

/**
 * Scaffolds a new navigation component.
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
    addModuleToModule(host, modulePath, 'LayoutModule', '@angular/cdk/layout');
    addModuleToModule(host, modulePath, 'MatToolbarModule', '@angular/material');
    addModuleToModule(host, modulePath, 'MatButtonModule', '@angular/material');
    addModuleToModule(host, modulePath, 'MatSidenavModule', '@angular/material');
    addModuleToModule(host, modulePath, 'MatIconModule', '@angular/material');
    addModuleToModule(host, modulePath, 'MatListModule', '@angular/material');
  };
}
