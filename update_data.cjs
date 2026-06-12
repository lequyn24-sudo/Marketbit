const fs = require('fs');

const path = './src/data/mockData.ts';
let content = fs.readFileSync(path, 'utf8');

const defaultDesc = `"Click to read the full breakdown of this developing story and see how it impacts the broader crypto markets."`;
const defaultTime = `"4 hours ago"`;
const defaultAuthor = `"FelixCryptoView"`;

// Match objects that look like { id: ..., title: "...", image: "...", color: "..." }
// and add description, time, and author if they are missing.
content = content.replace(/\{ id: \d+, title: "[^"]+", image: "[^"]+", color: "[^"]+" \}/g, (match) => {
  return match.replace(' }', `, description: ${defaultDesc}, time: ${defaultTime}, author: ${defaultAuthor} }`);
});

// Also match the ones that already have description and time (in Altcoins) and add author
content = content.replace(/\{ id: \d+, title: "[^"]+", description: "[^"]+", time: "[^"]+", image: "[^"]+", color: "[^"]+" \}/g, (match) => {
  return match.replace(' }', `, author: ${defaultAuthor} }`);
});

fs.writeFileSync(path, content, 'utf8');
console.log('Updated mockData.ts successfully');
