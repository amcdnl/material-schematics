import { chain, Rule, noop, Tree, SchematicContext } from '@angular-devkit/schematics';
import { Schema } from './schema';
import componentSchematic from '@schematics/angular/component';
import { addToModule } from '../utils/ast';

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
    addToModule(host, modulePath, 'LayoutModule', '@angular/cdk/layout');
    addToModule(host, modulePath, 'MatToolbarModule', '@angular/material');
    addToModule(host, modulePath, 'MatButtonModule', '@angular/material');
    addToModule(host, modulePath, 'MatSidenavModule', '@angular/material');
    addToModule(host, modulePath, 'MatIconModule', '@angular/material');
    addToModule(host, modulePath, 'MatListModule', '@angular/material');
    return host;
  };
}
