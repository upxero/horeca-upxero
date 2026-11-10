/* Read actual generated redirects and scoped Netlify fallbacks. Local verification
   emulates these rules; it is not a claim of deployed Netlify/CDN verification. */
const fs = require('fs');
const path = require('path');
module.exports = function createResolver(build) {
  const exact = fs.readFileSync(path.join(build, '_redirects'), 'utf8').split(/\r?\n/)
    .map(line => line.trim().split(/\s+/)).filter(row => row.length === 3 && !row[0].startsWith('#'));
  const config = fs.readFileSync(path.resolve(build, '../../netlify.toml'), 'utf8');
  const fallback = [...config.matchAll(/\[\[redirects\]\]\s*from\s*=\s*"([^"]+)"\s*to\s*=\s*"([^"]+)"\s*status\s*=\s*(\d+)/g)]
    .map(match => [match[1], match[2], match[3]]);
  const fileFor = relative => path.resolve(build, '.' + relative);
  const isFile = file => file.startsWith(build + path.sep) && fs.existsSync(file) && fs.statSync(file).isFile();
  return pathname => {
    const rule = exact.find(row => row[0] === pathname);
    if (rule) return { file: fileFor(rule[1]), status: Number(rule[2]) };
    const asset = fileFor(pathname);
    if (isFile(asset)) return { file: asset, status: 200 };
    for (const [from, to, status] of fallback) {
      if ((from.endsWith('*') && pathname.startsWith(from.slice(0, -1))) || pathname === from) {
        if (to.startsWith('/.netlify/functions/')) return { status: 501, functionRoute: to };
        return { file: fileFor(to), status: Number(status) };
      }
    }
    return { status: 404 };
  };
};
