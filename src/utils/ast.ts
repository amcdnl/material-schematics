import { SchematicsException } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { getConfig, getAppFromConfig } from '@schematics/angular/utility/config';
import { normalize } from '@angular-devkit/core';
import * as parse5 from 'parse5';

/**
 * Reads file given path and returns TypeScript source file.
 */
export function getSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find bootstrapped module.`);
  }
  const content = buffer.toString();
  const source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);

  return source;
}

/**
 * Adds a module to the root app module.
 */
export function addModuleToApp(host: Tree, module: string, src: string) {
  const config = getConfig(host);
  const app = getAppFromConfig(config, '0');
  const modulePath = getAppModulePath(host, app);
  const moduleSource = getSourceFile(host, modulePath);
  const changes = addImportToModule(moduleSource, modulePath, module, src);
  const recorder = host.beginUpdate(modulePath);

  changes.forEach((change: InsertChange) => {
    recorder.insertLeft(change.pos, change.toAdd);
  });

  host.commitUpdate(recorder);
}

/**
 * Gets the app index.html file
 */
export function getIndexPath(host: Tree) {
  const config = getConfig(host);
  const app = getAppFromConfig(config, '0');
  return normalize(`/${app.root}/${app.index}`);
}

/**
 * Parses the index.html file to get the HEAD tag position.
 */
export function getHeadTag(host: Tree, indexPath) {
  const buffer = host.read(indexPath);
  const document = parse5.parse(buffer.toString(),
    { locationInfo: true }) as parse5.AST.Default.Document;

  let head;
  const visit = (nodes: parse5.AST.Default.Node[]) => {
    nodes.forEach(node => {
      const element = <parse5.AST.Default.Element>node;
      if (element.tagName === 'head') {
        head = element;
      } else {
        if (element.childNodes) {
          visit(element.childNodes);
        }
      }
    });
  };

  visit(document.childNodes);

  if (!head) {
    throw new Error('Head element not found!');
  }

  return {
    position: head.__location.startTag.endOffset
  };
}

/**
 * Adds a link to the index.html head tag
 */
export function addHeadLink(host: Tree, link: string) {
  const indexPath = getIndexPath(host);
  const node = getHeadTag(host, indexPath);

  const chng = new InsertChange(indexPath, node.position, link);
  const recorder = host.beginUpdate(indexPath);
  recorder.insertLeft(chng.pos, chng.toAdd);
  host.commitUpdate(recorder);
}
