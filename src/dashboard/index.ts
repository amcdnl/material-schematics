import { chain, Rule, noop, Tree, SchematicContext } from '@angular-devkit/schematics';
import { Schema } from './schema';
import componentSchematic from '@schematics/angular/component';
import { addToModule } from '../utils/ast';
import { addHeadLink } from '../utils/html';

/**
 * Scaffolds a new navigation component.
 * Internally it bootstraps the base component schematic
 */
export default function(options: Schema): Rule {
  return chain([
    componentSchematic(options),
    addChartsRefToIndex(),
    options.skipImport ? noop() : addNavModulesToModule(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addNavModulesToModule(options: Schema) {
  return (host: Tree) => {
    addToModule(host, options.module, 'MatGridListModule', '@angular/material');
    addToModule(host, options.module, 'MatCardModule', '@angular/material');
    addToModule(host, options.module, 'MatMenuModule', '@angular/material');
    addToModule(host, options.module, 'MatIconModule', '@angular/material');
    addToModule(host, options.module, 'MatButtonModule', '@angular/material');
    return host;
  };
}

/**
 * Adds chat reference to index
 */
function addChartsRefToIndex() {
  return (host: Tree) => {
    addHeadLink(host, `<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>`);
    return host;
  };
}