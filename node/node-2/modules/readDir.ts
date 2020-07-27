import * as fs from "fs";
import * as path from "path";

export namespace ProcessingDir {
  type checkResult = {
    treeObject: {
      name: string,
      items: Array<object>
    },
    dirStat: {
      directories: number,
      files: number
    }
  }

  const rootPath = path.resolve(__dirname, '../');

  export function readDir(pathToDir: string, depth: number, exceptions: Array<string>): checkResult  {
    let directories: number = 0,
        files: number = 0;

    const checkingRules = (item: string) => !exceptions.find(i => i === item);

    const processingTree = (dir: string, shift: number = 0) => {
      const list: Array<string> = fs.readdirSync(dir);
      const items: Array<object> = list.map((item) => {
        const name: string = dir + "/" + item;

        if (fs.statSync(name).isDirectory()) {
          directories += 1;
          if (checkingRules(item) && (shift < depth || depth === -1)) {
            return processingTree(name, shift + 1);
          }
        } else {
          files += 1;
        }
        return {name: item}
      });

      return {
        name: path.resolve(rootPath, dir).split(path.sep).pop(),
        items
      }
    };

    return {
      treeObject: processingTree(pathToDir),
      dirStat: { directories, files }
    };
  }
}
