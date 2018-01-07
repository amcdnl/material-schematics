import { Rule, SchematicContext, Tree, chain, noop } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { materialVersion, cdkVersion, angularVersion } from '../utils/lib-versions';
import { getConfig } from '@schematics/angular/utility/config';
import { addModuleToApp } from '../utils/ast';
import { addHeadLink } from '../utils/html';

/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.momdule
 */
export default function(options: Schema): Rule {
  return chain([
    options.skipPackageJson ? noop() : addMaterialToPackageJson(options),
    addImportToStyles(options),
    addAnimationRootConfig(),
    addFontsToIndex()
  ]);
}

/**
 * Add material, cdk, annimations to package.json
 */
function addMaterialToPackageJson(options: Schema) {
  return (host: Tree) => {
    if (!host.exists('package.json')) return host;

    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);
    if (!json['dependencies']) {
      json['dependencies'] = {};
    }

    if (!json['dependencies']['@angular/cdk']) {
      json['dependencies']['@angular/cdk'] = cdkVersion;
    }

    if (!json['dependencies']['@angular/material']) {
      json['dependencies']['@angular/material'] = materialVersion;
    }

    if (!json['dependencies']['@angular/animations']) {
      json['dependencies']['@angular/animations'] = angularVersion;
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
    return host;
  };
}

/**
 * Add pre-built styles to style.ext file
 */
function addImportToStyles(options: Schema) {
  return (host: Tree) => {
    const config = getConfig(host);
    const theme = options.theme || 'indigo-pink';
    config.apps.forEach(app => {
      const has = app.styles.find((s: string) => s.indexOf('@angular/material/prebuilt-themes') > -1);
      if (!has) {
        app.styles.splice(0, 0, `~@angular/material/prebuilt-themes/${theme}.css`);
      }
    });
    host.overwrite('.angular-cli.json', JSON.stringify(config, null, 2));
    return host;
  };
}

/**
 * Add browser animation module to app.module
 */
function addAnimationRootConfig() {
  return (host: Tree) => {
    addModuleToApp(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations');
    return host;
  };
}

/**
 * Adds fonts to the index.ext file
 */
function addFontsToIndex() {
  return (host: Tree) => {
    addHeadLink(host, `<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">`);
    addHeadLink(host, `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`);
    return host;
  };
}
