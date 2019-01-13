'use strict';

let fs = require('fs');

let lessonid    = process.argv[2];
let file        = "podcast/" + lessonid + "/lesson.json";

try
{
    JSON.parse(fs.readFileSync(file, 'utf8'));
    console.log("OK");
}
catch(e)
{
    console.error("lesson#" + lessonid + ": " + e);
}