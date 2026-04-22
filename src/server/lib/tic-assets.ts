import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const PUBLIC_TIC = "public/tic-assets";

export function ticPublicUrl(runId: string, name: string) {
  return `/tic-assets/${runId}/${name}`;
}

export async function writeTicAsset(
  runId: string,
  name: string,
  data: Buffer,
) {
  const dir = path.join(process.cwd(), PUBLIC_TIC, runId);
  await mkdir(dir, { recursive: true });
  const fp = path.join(dir, name);
  await writeFile(fp, data);
  return fp;
}
