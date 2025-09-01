const fs = require('fs');

fs.mkdirSync('my-docs');

// nested directory
fs.mkdirSync('my-docss/folder1/folder2',{recursive: true});