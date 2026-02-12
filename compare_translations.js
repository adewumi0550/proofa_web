
const fs = require('fs');
const content = fs.readFileSync('/Users/adewumi0550/Documents/proofa_web/src/lib/translations.ts', 'utf8');

// A very hacky way to extract the en and de objects without executing the file (to avoid deps issues)
const enMatch = content.match(/en: \{([\s\S]*?)\n    \},/);
const deMatch = content.match(/de: \{([\s\S]*?)\n    \},/);

if (!enMatch || !deMatch) {
    console.error("Could not find en or de blocks");
    process.exit(1);
}

function getKeys(block) {
    const keys = [];
    const lines = block.split('\n');
    lines.forEach(line => {
        const match = line.match(/^\s+([a-zA-Z0-9_]+):/);
        if (match) {
            keys.push(match[1]);
        }
    });
    return keys;
}

const enKeys = getKeys(enMatch[1]);
const deKeys = getKeys(deMatch[1]);

const missingInDe = enKeys.filter(k => !deKeys.includes(k));
const missingInEn = deKeys.filter(k => !enKeys.includes(k));

console.log("Missing in DE:", missingInDe);
console.log("Missing in EN:", missingInEn);
