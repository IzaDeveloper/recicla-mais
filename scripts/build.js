const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const jsFiles = [
  'js/navigation.js',
  'js/materials.js',
  'js/form.js',
  'js/main.js'
];

const cssFiles = [
  'css/variables.css',
  'css/global.css',
  'css/components.css',
  'css/responsive.css'
];

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function minifyJs(source) {
  let out = '';
  let state = 'code';
  let quote = '';
  let escaped = false;
  let pendingSpace = false;

  const isWord = (c) => /[A-Za-z0-9_$]/.test(c || '');

  for (let i = 0; i < source.length; i++) {
    const c = source[i];
    const n = source[i + 1];

    if (state === 'line-comment') {
      if (c === '\n' || c === '\r') state = 'code';
      continue;
    }

    if (state === 'block-comment') {
      if (c === '*' && n === '/') {
        state = 'code';
        i++;
      }
      continue;
    }

    if (state === 'string') {
      out += c;
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === quote) state = 'code';
      continue;
    }

    if (state === 'template') {
      out += c;
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '`') state = 'code';
      continue;
    }

    if (c === '/' && n === '/') {
      state = 'line-comment';
      i++;
      continue;
    }

    if (c === '/' && n === '*') {
      state = 'block-comment';
      i++;
      continue;
    }

    if (c === '"' || c === "'") {
      if (pendingSpace && out && isWord(out[out.length - 1])) out += ' ';
      pendingSpace = false;
      quote = c;
      state = 'string';
      out += c;
      continue;
    }

    if (c === '`') {
      if (pendingSpace && out && isWord(out[out.length - 1])) out += ' ';
      pendingSpace = false;
      state = 'template';
      out += c;
      continue;
    }

    if (/\s/.test(c)) {
      pendingSpace = true;
      continue;
    }

    if (pendingSpace) {
      const prev = out[out.length - 1];
      if (isWord(prev) && isWord(c)) out += ' ';
      pendingSpace = false;
    }

    out += c;
  }

  return out.trim();
}

function minifyCss(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function minifyHtml(source) {
  return source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

function write(file, content) {
  const target = path.join(dist, file);
  ensureDir(path.dirname(target));
  fs.writeFileSync(target, content);
}

function bytes(file) {
  return Buffer.byteLength(fs.readFileSync(path.join(root, file)));
}

function copyFile(source, target) {
  const destination = path.join(dist, target);
  ensureDir(path.dirname(destination));
  fs.copyFileSync(path.join(root, source), destination);
}

function copyDirectory(source, target) {
  const sourceDir = path.join(root, source);
  const targetDir = path.join(dist, target);
  if (!fs.existsSync(sourceDir)) return;

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(path.join(source, entry.name), path.join(target, entry.name));
    } else {
      ensureDir(path.dirname(targetPath));
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

fs.rmSync(dist, { recursive: true, force: true });
ensureDir(dist);

const jsSource = jsFiles.map(read).join('\n');
const cssSource = cssFiles.map(read).join('\n');
let htmlSource = read('index.html');

htmlSource = htmlSource
  .replace(/\s*<link rel="stylesheet" href="css\/variables\.css">/g, '')
  .replace(/\s*<link rel="stylesheet" href="css\/global\.css">/g, '')
  .replace(/\s*<link rel="stylesheet" href="css\/components\.css">/g, '')
  .replace(/\s*<link rel="stylesheet" href="css\/responsive\.css">/g, '')
  .replace(/\s*<script src="js\/navigation\.js"><\/script>/g, '')
  .replace(/\s*<script src="js\/materials\.js"><\/script>/g, '')
  .replace(/\s*<script src="js\/form\.js"><\/script>/g, '')
  .replace(/\s*<script src="js\/main\.js"><\/script>/g, '');

htmlSource = htmlSource.replace('</head>', '  <link rel="stylesheet" href="assets/styles.min.css">\n</head>');
htmlSource = htmlSource.replace('</body>', '  <script src="assets/app.min.js"></script>\n</body>');

const jsMin = minifyJs(jsSource);
const cssMin = minifyCss(cssSource);
const htmlMin = minifyHtml(htmlSource);

write('assets/app.min.js', jsMin + '\n');
write('assets/styles.min.css', cssMin + '\n');
write('index.html', htmlMin + '\n');
copyDirectory('images', 'images');

const sourceJsBytes = jsFiles.reduce((sum, file) => sum + bytes(file), 0);
const sourceCssBytes = cssFiles.reduce((sum, file) => sum + bytes(file), 0);
const sourceHtmlBytes = bytes('index.html');
const outputJsBytes = Buffer.byteLength(jsMin);
const outputCssBytes = Buffer.byteLength(cssMin);
const outputHtmlBytes = Buffer.byteLength(htmlMin);

const reduction = (before, after) => ((1 - after / before) * 100);

const report = {
  tool: 'Node.js build script (bundler e minificador sem dependências externas)',
  javascript: { sourceBytes: sourceJsBytes, outputBytes: outputJsBytes, reductionPercent: reduction(sourceJsBytes, outputJsBytes) },
  css: { sourceBytes: sourceCssBytes, outputBytes: outputCssBytes, reductionPercent: reduction(sourceCssBytes, outputCssBytes) },
  html: { sourceBytes: sourceHtmlBytes, outputBytes: outputHtmlBytes, reductionPercent: reduction(sourceHtmlBytes, outputHtmlBytes) },
  total: { sourceBytes: sourceJsBytes + sourceCssBytes + sourceHtmlBytes, outputBytes: outputJsBytes + outputCssBytes + outputHtmlBytes, reductionPercent: reduction(sourceJsBytes + sourceCssBytes + sourceHtmlBytes, outputJsBytes + outputCssBytes + outputHtmlBytes) }
};

write('build-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
