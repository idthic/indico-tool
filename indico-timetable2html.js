const agh = require("agh.sprintf");

const baseurl = process.env.indico_baseurl;
const inputFile = process.env.indico_input;

function htescape(s) {return s.replace(/[&<>]/g, $0 => {return {"&": "&amp;", "<": "&lt;", ">": "&gt;"}[$0];});}
function atescape(s) {return s.replace(/[&<>"]/g, $0 => {return {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"}[$0];});}

console.log("<!DOTYPE html>");
console.log("<html>");
console.log("<head>");
console.log("  <link rel=\"stylesheet\" href=\"slides.css\" />");
console.log("  <script src=\"slides.js\"></script>");
console.log("  <title>QM2022 Contributions &amp; Slides</title>");
console.log("</head>");
console.log("<body>");
console.log("<h1>QM2022 Contributions &amp; Slides</h1>");

let current_date = "";
let session_name = "";
let session_index = 0;
let talk_index = 0;

const fs = require("fs");
JSON.parse(fs.readFileSync(inputFile, "utf8")).forEach(talk => {
  if (current_date != talk.date) {
    current_date = talk.date;
    session_index = 0;
  }

  if (session_name != talk.session) {
    console.log("");
    session_name = talk.session;
    session_index++;
    talk_index = 0;
    console.log("<h2>" + htescape(session_name) + "</h2>");
  }

  talk_index++;
  console.log("<div class=\"talk\">");
  console.log("  <h3 class=\"talk\">");
  if (talk.attach) {
    let attach_index = 0;
    talk.attach.forEach(link => {
      if (link.startsWith("/")) link = baseurl + link;
      const name = link.replace(/^.*\//, "");
      const file = agh.sprintf("%s-S%02d%02d%s-%s", talk.date, session_index, talk_index, "abcdefghijklmnop".substr(attach_index++, 1), name);
      const ext = /[^.]+\.[^.]+$/.test(name) ? name.replace(/^.*\./, "").toLowerCase() : null;
      console.log("    <a class=\"attach" + (ext ? " type-" + ext : "") + "\" title=\"" + atescape(link) + "\" href=\"" + atescape(file) +"\">[" + htescape(ext || name) + "]</a>");
      console.log("    <!-- DOWNLOAD \"" + link + "\" \"" + file + "\" -->");
    });
  }
  console.log("    <span class=\"author\">" + htescape(talk.author || "?????") + "</span>");
  console.log("    <span class=\"title\">" + htescape(talk.title) + "</span>");
  console.log("  </h3>");
  if (talk.desc) {
    console.log("  <span class=\"desc\">" + htescape(talk.desc).replace(/\r?\n/g, "<br/>") + "</span>");
  }
  console.log("</div>");
});

console.log("");
console.log("</body>");
console.log("</html>");
