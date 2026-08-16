const fs = require('fs');
const lines = fs.readFileSync('C:\\Users\\himan\\.gemini\\antigravity-ide\\brain\\e6a0a756-be5f-45af-b42f-ec3b8a4a38ba\\.system_generated\\logs\\transcript_full.jsonl', 'utf8').split('\n');

for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('The following changes were made by the replace_file_content tool to: d:\\\\Himanshu\\\\Skills\\\\CLothing app\\\\atayr-landing\\\\src\\\\app\\\\globals.css')) {
        console.log('Found replace_file_content at step around index ' + i);
    }
    if (lines[i].includes('git diff src/app/globals.css')) {
        console.log('Found git diff at line ' + i);
        let diffContent = JSON.parse(lines[i + 1]).content;
        fs.writeFileSync('diff_output.txt', diffContent);
        break;
    }
}
