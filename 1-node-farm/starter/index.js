const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

// ----------- Server -----------

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8",
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8",
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8",
);

const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%productName%}/g, product.productName);
  output = output.replace(/{%image%}/g, product.image);
  output = output.replace(/{%price%}/g, product.price);
  output = output.replace(/{%from%}/g, product.from);
  output = output.replace(/{%nutrients%}/g, product.nutrients);
  output = output.replace(/{%quantity%}/g, product.quantity);
  output = output.replace(/{%description%}/g, product.description);
  output = output.replace(/{%id%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%notOrganic%}/g, "not-organic");
  }

  return output;
};

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case "/":
    case "/overview":
      const cardsHtml = dataObj
        .map((el) => replaceTemplate(cardTemplate, el))
        .join("");
      const overviewHTML = overviewTemplate.replace(
        "{%productCards%}",
        cardsHtml,
      );

      res.writeHead(200, { "Content-type": "text/html" });
      res.end(overviewHTML);
      break;
    case "/product":
      const product = dataObj.find((el) => el.id.toString() === query.id);

      const productHTML = replaceTemplate(productTemplate, product);

      res.writeHead(200, { "Content-type": "text/html" });
      res.end(productHTML);
      break;
    case "/api":
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(data);
      break;
    default:
      res.writeHead(404, {
        "Content-type": "text/html",
      });
      res.end("<h1>Page not found</h1>");
      break;
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});

// ----------- Files -----------
// Blocking way
// const text = fs.readFileSync('./txt/input.txt', 'utf-8');
//
// console.log(text);
//
// const newText = `This is what we know about the avocado: ${text}. \nCreated on ${Date.now()}`;
//
// fs.writeFileSync('./txt/output.txt', newText);

// Non-blocking way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//                 console.log('Your file has been written successfully.');
//             })
//         });
//     });
// });
