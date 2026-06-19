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


  const userResponse = await fetch(
    'https://fdnd-agency.directus.app/items/milledoni_users/63?fields=*.*'
  )

  const userData = await userResponse.json()
  const likedCount = userData.data.liked_products.length

  response.render("index.liquid", {
    products: productData,
    likedCount: likedCount,
    status: request.query.status
  });
});

// HOME/CADEAU-OVERZICHT PRODUCT OPSLAAN
  app.post("/save-product", async function (request, response) {
  if (!request.body.productId) {
    return response.redirect(303, "/")
  }
 
  await fetch(
    "https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1",
    {
      method: "POST",
 
      body: JSON.stringify({
        milledoni_users_id: 63,
        milledoni_products_id: request.body.productId,
      }),
 
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    },
  );
 
  response.redirect(303, "/?status=success");
});

app.get("/blog", async function (request, response) {

  const params = new URLSearchParams({
    fields: "id,intro,title,image.id,image.width,image.height"
  });

  const blogData = await fetch(
    `https://fdnd-agency.directus.app/items/milledoni_blog?${params}`
  );
  const blogDataJSON = await blogData.json();

  response.render("blog.liquid", { 
    products: blogDataJSON.data});
});


app.get("/cadeau-overzicht", async function (request, response) {
  response.render("cadeau.liquid");
});

app.get("/wishlist", async function (request, response) {
  const params = {
    fields:
      "liked_products.milledoni_products_id.id," +
      "liked_products.milledoni_products_id.name," +
      "liked_products.milledoni_products_id.image," +
      "liked_products.milledoni_products_id.amount",
  };

  // fetch gebruiker 63 inclusief opgeslagen producten
  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/milledoni_users/63/?" +
      new URLSearchParams(params),
  );

  // zet response om naar JSON
  const productResponseJSON = await productResponse.json();

  // pak alleen de product data uit de koppeling
  const likedProducts = productResponseJSON.data.liked_products
    .filter((item) => item.milledoni_products_id !== null)
    .map((item) => item.milledoni_products_id);

  // stuur producten door naar de liquid pagina
  response.render("wishlist.liquid", {
    likedProducts: likedProducts,
  });
});

app.post("/verwijder", async function (request, response) {
  const productId = request.body.id;

  console.log("PRODUCT ID:", productId);

  if (!productId) {
    console.log("Geen product id ontvangen");
    return response.redirect(303, "/wishlist");
  }

  const relationResponse = await fetch(
    `https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1?filter[milledoni_users_id][_eq]=63&filter[milledoni_products_id][_eq]=${productId}&fields=id&limit=1`,
  );

  const relationJSON = await relationResponse.json();

  console.log("RELATION RESPONSE:", relationJSON);

  if (!relationJSON.data?.length) {
    console.log("Geen koppeling gevonden");
    return response.redirect(303, "/wishlist");
  }

  const relationId = relationJSON.data[0].id;

  console.log("RELATION ID:", relationId);

  const deleteResponse = await fetch(
    `https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1/${relationId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    },
  );

  console.log("DELETE STATUS:", deleteResponse.status);

  response.redirect(303, "/wishlist");
});

app.get("/spotters", async function (request, response) {
  const params = {
    fields: "*",
  };
  const spottersResponse = await fetch(
    "https://fdnd-agency.directus.app/items/milledoni_spotters?" +
      new URLSearchParams(params),
  );
  const spottersResponseJson = await spottersResponse.json();
  response.render("spotters.liquid", {
    spotters: spottersResponseJson.data,
  });
});

app.post("/spotters", async function (request, response) {
  const newSpotter = {
    //maak ik newspotter object aan, met de data name, photo etc//
    name: request.body.name,
    photo: request.body.photo,
    description: request.body.description,
    interested_in: request.body.interested_in,
  };

  await fetch(
    // hier maak ik een POST request naar de API, met als body het newspotter object//
    "https://fdnd-agency.directus.app/items/milledoni_spotters",
    {
      method: "POST",
      headers: {
        // hier geef ik aan dat de body van mijn request JSON is//
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSpotter), // hier zet ik newspotter object om naar json//
    },
  );

  response.redirect("/spotters");
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
// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set("port", process.env.PORT || 8000);

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  console.log(`http://localhost:${app.get("port")}`);
});
