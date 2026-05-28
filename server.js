// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from "express";

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from "liquidjs";

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }));

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static("public"));

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine("liquid", engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set("views", "./views");

// HOME/CADEAU-OVERZICHT PRODUCTEN
app.get("/", async function (request, response) {
  const productParams = {};

  // filter prijs in de footer (Maarten)
  if (request.query.price) {
    productParams["filter[amount][_between]"] = "0," + request.query.price;
  } else {
    productParams["sort"] = "id";
  }

  // Productdata ophalen met Directus API van Milledoni en filters meesturen
  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/milledoni_products?" +
      new URLSearchParams(productParams),
  );

  // Zet response om naar json voor server
  const productResponseJSON = await productResponse.json();
  // Alleen de lijst met producten uit API
  const productData = productResponseJSON.data;

  response.render("index.liquid", {
    products: productData,
  });
});

// HOME/CADEAU-OVERZICHT PRODUCT OPSLAAN
app.post("/save-product", async function (request, response) {
  response.redirect("/");
});

app.get("/blog", async function (request, response) {
  response.render("blog.liquid");
});

app.get("/cadeau-overzicht", async function (request, response) {
  response.render("cadeau.liquid");
});

app.get("/wishlist", async function (request, response) {
  response.render("cadeau.liquid");
});

app.get("/spotters", async function (request, response) {
  response.render("spotters.liquid");
});

app.get("/gifts/:tags", async function (req, res) {
  const params = {
    fields: "name,image,amount,slug,id,tags",
    "filter[tags][_contains]": req.params.tags,
  };

  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/milledoni_products/?" +
      new URLSearchParams(params),
  );
  const productResponseJSON = await productResponse.json();

  res.render("index.liquid", {
    products: productResponseJSON.data,
  });
});

app.use(function (req, res) {
  res.render("404.liquid");
});

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set("port", process.env.PORT || 8000);

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  console.log(`http://localhost:${app.get("port")}`);
});
