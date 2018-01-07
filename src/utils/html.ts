import { Tree, SchematicsException } from '@angular-devkit/schematics';
import * as parse5 from 'parse5';
import { getIndexPath } from './ast';
import { InsertChange } from '@schematics/angular/utility/change';

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
    throw new SchematicsException('Head element not found!');
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
