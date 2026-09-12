const fs = require("fs");
const vm = require("vm");
const path = require("path");

const html = fs.readFileSync("frontend/index.html", "utf8");
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1])
  .filter(Boolean);

scripts.forEach((source, index) => {
  new vm.Script(source, { filename: `frontend-inline-${index + 1}.js` });
});

const external = [...html.matchAll(/<script[^>]+src="\/static\/([^"]+)"[^>]*>/gi)];
external.forEach((match) => {
  const filename = path.join("frontend", match[1].split('?')[0]);
  new vm.Script(fs.readFileSync(filename, "utf8"), { filename });
});
if (!scripts.length && !external.length) throw Error("No application scripts checked");
console.log(`${scripts.length} inline and ${external.length} local frontend scripts parsed successfully.`);
