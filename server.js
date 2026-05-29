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

app.get("/", async function (request, response) {
  response.render("index.liquid");
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

app.get("/spotters", async function (request, response){
  const params ={
    fields: '*'
  }
  const spottersResponse = await fetch ( 'https://fdnd-agency.directus.app/items/milledoni_spotters?'
    + new URLSearchParams(params)
  )
  const spottersResponseJson = await spottersResponse.json();
  response.render("spotters.liquid",{
      spotters: spottersResponseJson.data,
      status: request.query.status

})
});

app.post("/spotters", async function (request, response){
  const newSpotter = { //maak ik newspotter object aan, met de data name, photo etc//
    name: request.body.name,
    photo: request.body.photo,
    description: request.body.description,
    interested_in: request.body.interested_in
  };

  await fetch( // hier maak ik een POST request naar de API, met als body het newspotter object//
    "https://fdnd-agency.directus.app/items/milledoni_spotters",
    {
      method: "POST",
      headers: {// hier geef ik aan dat de body van mijn request JSON is//
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSpotter)// hier zet ik newspotter object om naar json//
    }
  );


  response.redirect("/spotters?status=succes")
});
// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set("port", process.env.PORT || 8000);

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  console.log(
    `http://localhost:${app.get("port")}`,
  );
});

