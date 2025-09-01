const fs = require('fs');

// Sync
fs.writeFileSync("./name.txt","Ayushi Anand");

// Async
fs.writeFile("./name.txt","Tauqueer Alam", (err) => {});