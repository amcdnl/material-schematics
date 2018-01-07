import { chain, Rule, noop, Tree, SchematicContext, externalSchematic } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { addToModule } from '../utils/ast';
import { addHeadLink } from '../utils/html';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';

/**
 * Scaffolds a new navigation component.
 * Internally it bootstraps the base component schematic
 */
export default function(options: Schema): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', options),
    addChartsRefToIndex(),
    options.skipImport ? noop() : addNavModulesToModule(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addNavModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options);
    addToModule(host, modulePath, 'MatGridListModule', '@angular/material');
    addToModule(host, modulePath, 'MatCardModule', '@angular/material');
    addToModule(host, modulePath, 'MatMenuModule', '@angular/material');
    addToModule(host, modulePath, 'MatIconModule', '@angular/material');
    addToModule(host, modulePath, 'MatButtonModule', '@angular/material');
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