const esbuild = require('esbuild');

try {
  esbuild.buildSync({
    entryPoints: ['frontend/agentation-entry.jsx'],
    bundle: true,
    minify: true,
    outfile: 'frontend/agentation.js',
    define: {
      'process.env.NODE_ENV': '"development"'
    }
  });
  console.log('Successfully bundled Agentation into frontend/agentation.js');
} catch (err) {
  console.error('Build failed:', err);
  process.exit(1);
}
