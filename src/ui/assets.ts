// Every PNG under assets/ui is addressed by its file name, which is its registry ID (RULE-UI-003).
// _sheet/_preview masters are excluded from the bundle.
const files = import.meta.glob(['/assets/ui/**/*.png', '!**/_*.png'], { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

const byId: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  const name = path.slice(path.lastIndexOf('/') + 1, -4);
  byId[name] = url;
}

export const assetUrl = (id: string): string | undefined => byId[id];
