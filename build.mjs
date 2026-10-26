import {readFile,writeFile} from 'node:fs/promises';
import {validate} from './dist/engine.js';
const data=JSON.parse(await readFile(new URL('./dist/data.json',import.meta.url)));
validate(data);
await writeFile(new URL('./dist/README.md',import.meta.url),await readFile(new URL('./README.md',import.meta.url)));
console.log('Static site validated; dist/ is ready.');
