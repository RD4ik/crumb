import sharp from 'sharp';
import {readdir, mkdir, readFile, writeFile} from 'node:fs/promises';
const source = new URL('../design/photography/', import.meta.url);
const target = new URL('../public/images/v2/', import.meta.url);
await mkdir(target, {recursive:true});
for (const name of await readdir(source)) {
  if (!name.endsWith('.png')) continue;
  const output = new URL(name.replace('.png','.webp'),target);
  await sharp(new URL(name,source).pathname).webp({quality:88,alphaQuality:100,effort:6}).toFile(output.pathname);
  console.log(name+' → WebP');
}
