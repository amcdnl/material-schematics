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
    addToModule(host, options.module, 'LayoutModule', '@angular/cdk/layout');
    addToModule(host, options.module, 'MatToolbarModule', '@angular/material');
    addToModule(host, options.module, 'MatButtonModule', '@angular/material');
    addToModule(host, options.module, 'MatSidenavModule', '@angular/material');
    addToModule(host, options.module, 'MatIconModule', '@angular/material');
    addToModule(host, options.module, 'MatListModule', '@angular/material');
    return host;
  };
}
