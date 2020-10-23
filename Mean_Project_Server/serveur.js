const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json()); //permet de parser la trame HTTP afin de récuperer les données contruit sous format json
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

app.get("/", (req, res) => {
  console.log("azul fellawen");
  res.end("<h1>coucou</h1>");
});

//permet de dire au navigateur qu'il traite des données sous le format json
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "Application/Json");
  next();
});

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    let db = client.db("BIKESTORE");

    app.get("/produits", (req, res) => {
      console.log("je veux la liste des produits");
      db.collection("produits")
        .find()
        .toArray((err, documents) => {
          res.end(JSON.stringify(documents));
        });
    });

    //produits par categorie
    app.get("/produits/:category", (req, res) => {
      //console.log("route : /produits/:type");
      db.collection("produits")
        .find({ category: req.params.category })
        .toArray((err, documents) => {
          res.end(JSON.stringify(documents));
        });
    });
    //produits par details
    app.post("/produits/details", (req, res) => {
      console.log("route : /produits/details");
      const velo = req.body;
      db.collection("produits")
        .find(velo)
        .toArray((err, documents) => {
          res.end(JSON.stringify(documents));
        });
    });

    //liste des produits
    app.post("/produits", (req, res) => {
      console.log(req.body);
      try {
        db.collection("produits").insertOne(req.body);
        res.end(JSON.stringify({ message: "ajout effectué" }));
      } catch (e) {
        res.end(JSON.stringify({ message: "erreur :" + e }));
      }
    });

    //Catégories
    app.get("/categorie", (req, res) => {
      db.collection("produits")
        .distinct("category")
        .then((doc) => {
          console.log(doc);
          res.json(doc);
        });
    });

    //supprimer produit
    app.post("/Supprimer", (req, res) => {
      console.log(req.body);
      try {
        db.collection("produits").remove(req.body);
        res.end(JSON.stringify({ message: "remove effectué" }));
      } catch (e) {
        res.end(JSON.stringify({ message: "erreur :" + e }));
      }
    });

    //service de connexion
    app.post("/membres/connexion", (req, res) => {
      console.log(JSON.stringify(req.body));
      const user = req.body;
      try {
        db.collection("membres")
          .find(user)
          .toArray((err, documents) => {
            //console.log(documents);
            if (documents != undefined && documents.length >= 1) {
              console.log("connecte");
              console.log(
                JSON.stringify({ resultat: "1", message: "connexion réussie" })
              );
              res.end(
                JSON.stringify({ resultat: "1", message: "connexion réussie" })
              );
            } else {
              console.log("non connecte");
              res.end(
                JSON.stringify({
                  resultat: "0",
                  message: "email ou/et mot de passe incorrect",
                })
              );
            }
          });
      } catch (e) {
        res.end(JSON.stringify({ resultat: "0", message: e }));
      }
    });
    //Service d'inscription
    app.post("/membres/inscription", (req, res) => {
      console.log("demande d'inscription");
      let newUser = req.body;
      try {
        console.log(
          db.collection("membres").find({ email: newUser.email }).count() > 0
        );
        if (
          db.collection("membres").find({ email: newUser.email }).count() > 0
        ) {
          res.end(JSON.stringify({ message: "utilisateur deja inscrit" }));
        } else {
          db.collection("membres").insertOne(newUser);
          res.end(
            JSON.stringify({ message: "inscription reussi", resultat: "1" })
          );
        }
      } catch (error) {
        res.end(JSON.stringify(error.message));
      }
    });
    //service panier:
    //*recupération panier
    app.get("/panier/:email", (req, res) => {
      console.log("get /panier");
      try {
        db.collection("panier")
          .find({ email: req.params.email })
          .toArray((err, doc) => {
            res.json(doc);
          });
      } catch (error) {
        res.json(error.message);
      }
    });

    //*ajout panier
    app.post("/panier", (req, res) => {
      console.log("post/panier avec :" + req.body);
      try {
        db.collection("panier")
          .insertOne(req.body)
          .then((doc) => {
            console.log(doc);
            res.json({ message: "insertion dans le panier effectué" });
          });
      } catch (error) {
        res.json(error.message);
      }
    });
    //supprimer element du panier par id:
    app.get("/panier/supprimer/:id", (req, res) => {
      console.log("je veux supprimer " + req.params.id);
      try {
        db.collection("panier").remove({ id: req.params.id });
        res.json({ message: "element supprimer du panier" });
        console.log("element supprimé");
      } catch (error) {
        res.json(error.message);
      }
    });
  }
);

app.listen(8000, () => {
  console.log("SERVER STARTED");
});
