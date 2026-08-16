const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.split('\\n').join('\n');
fs.writeFileSync('src/app/globals.css', css);
