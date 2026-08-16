const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src').filter(f => f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.css'));

const replacements = {
  'na-crolled': 'nav-scrolled',
  'hero__shap- ': 'hero__shape-1 ',
  'hero__shap-"': 'hero__shape-1"',
  '.hero__shap- {': '.hero__shape-1 {\n  background: var(--coral);\n}\n.hero__shape-2 {\n  background: var(--teal);\n}\n.hero__shape-3 {',
  'problem__stat-ertical': 'problem__stats-vertical',
  'differentiator__lin-ighlight': 'differentiator__line-highlight',
  'differentiator__lin-ub': 'differentiator__line-sub',
  'cta-section__shap- ': 'cta-section__shape-1 ',
  'cta-section__shap-"': 'cta-section__shape-1"',
  '.cta-section__shap- {': '.cta-section__shape-1 {\n  background: var(--coral);\n}\n.cta-section__shape-2 {'
};

// Wait, the shape ones lost their numbers!
// Let's do it file by file, it's safer.
