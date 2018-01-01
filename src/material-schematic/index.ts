import { Rule, SchematicContext, Tree, chain, noop } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { materialVersion, cdkVersion } from '../utils/lib-versions';


export function scaffoldMaterialSchematic(options: Schema): Rule {
  return chain([
    options.skipPackageJson ? noop() : addMaterialToPackageJson(options),
    addImportToStyles(options)
  ]);
}

function addMaterialToPackageJson(options: any) {
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
    host.overwrite('package.json', JSON.stringify(json));
  };
}

function addImportToStyles(options: any) {
  return (host: Tree) => {

  };
}
