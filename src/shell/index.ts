import { Rule, SchematicContext, Tree, chain, noop, SchematicsException } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { materialVersion, cdkVersion, angularVersion } from '../utils/lib-versions';
import { getConfig } from '../utils/devkit-utils/config';
import { addToRootModule } from '../utils/ast';
import { addHeadLink } from '../utils/html';
import { addPackageToPackageJson } from '../utils/package';

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
    addPackageToPackageJson(host, 'dependencies', '@angular/cdk', cdkVersion);
    addPackageToPackageJson(host, 'dependencies', '@angular/material', materialVersion);
    addPackageToPackageJson(host, 'dependencies', '@angular/animations', angularVersion);
    return host;
  };
}

/**
 * Add pre-built styles to style.ext file
 */
function addImportToStyles(options: Schema) {
  return (host: Tree) => {
    const config = getConfig(host);
    config.apps.forEach(app => {
      const theme = `~@angular/material/prebuilt-themes/${options.theme}.css`;
      const hasCurrentTheme = app.styles.find((s: string) => s.indexOf(theme) > -1);
      const hasOtherTheme = app.styles.find((s: string) => s.indexOf('@angular/material/prebuilt-themes') > -1);

      if (!hasCurrentTheme && !hasOtherTheme) {
        app.styles.splice(0, 0, theme);
      }

      if (hasOtherTheme) {
        throw new SchematicsException(`Another theme is already defined.`);
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
    addToRootModule(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations');
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
