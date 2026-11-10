/* Build-time rendering only. No browser, network, backend or service is started. */
const fs = require('fs');
const os = require('os');
const path = require('path');
const webpack = require('webpack');
const { verifyHTML } = require('./verify-html.cjs');

process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'upxero-prerender-'));

async function main() {
  const environment = require('react-scripts/config/env')('');
  const config = {
    mode: 'production', target: 'node', devtool: false,
    context: root, entry: './src/prerender.jsx',
    output: { path: temporary, filename: 'renderer.cjs', library: { type: 'commonjs2' } },
    resolve: { extensions: ['.js', '.jsx', '.json'], alias: { '@': path.join(root, 'src') } },
    module: { rules: [
      { test: /\.[jt]sx?$/, include: path.join(root, 'src'),
        use: { loader: require.resolve('babel-loader'), options: {
          babelrc: false, configFile: false,
          presets: [[require.resolve('babel-preset-react-app'), { runtime: 'automatic' }]],
        } } },
      { test: /\.css$/, type: 'asset/source' },
    ] },
    plugins: [new webpack.DefinePlugin(environment.stringified)],
    optimization: { minimize: false },
  };
  await new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((error, stats) => {
      compiler.close(closeError => {
        if (error || closeError) return reject(error || closeError);
        if (stats.hasErrors()) return reject(new Error(stats.toString({ all: false, errors: true })));
        resolve();
      });
    });
  });
  const renderer = require(path.join(temporary, 'renderer.cjs'));
  // This is the CRA shell, retaining its existing scripts, CSS and integration tags.
  const shell = fs.readFileSync(path.join(build, 'index.html'), 'utf8')
    .replace(/<title[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\s+[^>]*name=["']description["'][^>]*>/gi, '');
  const manifest = [];
  const rules = ['# Generated from the same route map as React, canonical tags and sitemap.'];
  for (const pathname of renderer.prerenderPaths) {
    const page = renderer.renderPage(pathname);
    const output = pathname === '/' ? 'index.html'
      : '_prerender/' + pathname.replace(/^\/|\/$/g, '') + '.html';
    const html = shell.replace(/<html\s+lang=["'][^"']*["']/i, '<html lang="' + page.language + '"')
      .replace(/<noscript>[\s\S]*?<\/noscript>/i, '<noscript>' + page.interactiveNotice + '</noscript>')
      .replace('</head>', page.head + '</head>')
      .replace('<div id="root"></div>', '<div id="root" data-prerendered="true" data-prerender-year="' + page.year + '">' + page.body + '</div>');
    if (!html.includes('data-prerendered="true"')) throw new Error('CRA root placeholder missing');
    const destination = path.join(build, output);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, html);
    manifest.push({ pathname, file: output });
    // Explicit rewrites avoid changing existing no-trailing-slash page URLs.
    rules.push(pathname + ' /' + output + ' 200');
    const alias = pathname === '/' ? null : pathname.endsWith('/') ? pathname.slice(0, -1) : pathname + '/';
    if (alias) rules.push(alias + ' /' + output + ' 200');
  }
  const extraRules = fs.readFileSync(path.join(root, 'public/_redirects'), 'utf8').trim();
  for (const [pathname, output] of [['/404.html', '404.html'], ['/nl/404.html', '_prerender/nl-404.html']]) {
    const page = renderer.renderPage(pathname);
    const html = shell.replace(/<html\s+lang=["'][^"']*["']/i, '<html lang="' + page.language + '"')
      .replace('</head>', page.head + '</head>')
      .replace('<div id="root"></div>', '<div id="root" data-prerendered="true" data-prerender-year="' + page.year + '">' + page.body + '</div>');
    fs.writeFileSync(path.join(build, output), html);
  }
  fs.writeFileSync(path.join(build, '_redirects'), rules.join('\n') + '\n' + extraRules + '\n');
  fs.writeFileSync(path.join(build, 'sitemap.xml'), renderer.renderSitemap());
  fs.writeFileSync(path.join(build, 'prerender-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  verifyHTML(build);
  console.log('Prerendered and verified all ' + manifest.length + ' localized routes, including page content.');
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => {
  // This path is created above by mkdtemp, never supplied by a route or user.
  if (temporary.startsWith(path.join(os.tmpdir(), 'upxero-prerender-'))) {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});
