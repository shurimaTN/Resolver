const bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var express = require("express");
const { DigitalLink, Utils } = require("digital-link.js");
var urltarget=require('./const/api')()



var urlencoded = require('../serverconfig/dbconnection')();

module.exports = resolver => {

  resolver.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  resolver.use(express.static(__dirname + "/public"));
  resolver.use(bodyParser.json())
  /**
 * @swagger
 * /resolver/create_product:
 *    post:
 *       description: Returns all  digital links object stored in the DB with params dl link compressed
 *       parameters:
 *       - name:"tags"
 *       - in : "query"
 *       responses:
 *        "200":
 *          description: "successful operation"
 *        "405":
 *          description: "Invalid status value"
 *
 *
 *
 */

  resolver.post('/resolver/create_product', async (req, res) => {
    console.log("logging a request");
    console.log(req.body);

    MongoClient.connect(urlencoded, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("supplier").insertOne(req.body, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");



        res.status(200).send(re);
        db.close();

      });
    });

    res.send("1 document inserted")



  });
 /**
 * @swagger
 * /resolver/getAll:
 *    get:
 *       description: Returns all  digital links object stored in the DB with params dl link compressed
 *       parameters:
 *       - name:"tags"
 *       - in : "query"
 *       responses:
 *        "200":
 *          description: "successful operation"
 *        "405":
 *          description: "Invalid status value"
 *
 *
 *
 */


  resolver.get('/resolver/getAll', (req, res) => {
    console.log(Object.values(req.body));

    MongoClient.connect(urlencoded, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("supplier").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        res.status(200).send(result);

      });
    });



  });
 /**
 * @swagger
 * /resolver/getByAiValue:
 *    get:
 *       description: Returns all  digital links by AI value
 *       parameters:
 *       - name:"tags"
 *       - in : "query"
 *       responses:
 *        "200":
 *          description: "successful operation"
 *        "405":
 *          description: "Invalid status value"
 *
 *
 *
 */

  resolver.get('/resolver/getByAiValue', (req, res) => {



    MongoClient.connect(urlencoded, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("supplier").find({ "identifier": req.body }).toArray(function (err, result) {
        if (err) throw err;

        res.send(result)
        db.close();
      });
    });



  });
 
 /**
 * @swagger
 * /resolver/getDLCompByAiValue:
 *    get:
 *       description: Returns all  digital links object stored in the DB with params dl link compressed by AI value
 *       parameters:
 *       - name:"tags"
 *       - in : "query"
 *       responses:
 *        "200":
 *          description: "successful operation"
 *        "405":
 *          description: "Invalid status value"
 *
 *
 *
 */

  resolver.get('/resolver/getDLCompByAiValue', async (req, res) => {



    MongoClient.connect(urlencoded, function (err, db) {
      if (err) throw err;

      var dbo = db.db("mydb");
      dbo.collection("supplier").find({ "identifier": req.body }).toArray(function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          res.send(result.map(a => a.DigitalLinkURI_compressed));
        } else {
          res.send([]);
        }
        db.close();
      });
    });

  });
 /**
 * @swagger
 * /resolver/getTargetLinks:
 *    get:
 *       description: Returns all  target links
 *       parameters:
 *       - name:"tags"
 *       - in : "query"
 *       responses:
 *        "200":
 *          description: "successful operation"
 *        "405":
 *          description: "Invalid status value"
 *
 *
 *
 */
  resolver.get('/resolver/getTargetLinks', (req, res) => {


    MongoClient.connect(urlencoded, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("supplier").find(req.body).toArray(function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          res.render(__dirname + "/File/index.html", {
            url1: result[0].resolverResponse.URL1,
            url2: result[0].resolverResponse.URL2,
            url3: result[0].resolverResponse.URL3,


          });
        } else {
          res.send([]);
        }
        db.close();
      });
    });

  });

 /**
 * @swagger
 * /resolver/resolverResponse:
 *    get:
 *       description: Returns  resolver response value with test
 *       parameters:
 *       - name:"tags"
 *       - in : "query"
 *       responses:
 *        "200":
 *          description: "successful operation"
 *        "405":
 *          description: "Invalid status value"
 *
 *
 *
 */
  resolver.post('/resolver/resolverResponse', (req, res) => {


    MongoClient.connect(urlencoded, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("supplier").find(req.body).toArray(function (err, result) {
        if (err) throw err;
       // console.log(result[0].resolverResponse)
        res.send(result[0].resolverResponse)


        db.close();
      });
    });

  });

resolver.get("/allusers",(req,res)=>{


  if (req.body) {
    MongoClient.connect(urlencoded, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("users").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200)
        res.send(result)
        db.close();
      });
    });
  } else {
    res.status(405)
    res.send("Invalid status value")

  }




})








  /**
 * @swagger
 * /*:
 *    get:
 *       description: Returns page index html  based in 3 target link cile "resolverResponse" 
 *       parameters:
 *       - name:"resolverResponse"
 *       -in : "query"
 *       responses:
 *        "200":
 *          description: "successful operation send html with resolverResponse"
 *        
 *        "405":
 *          description: "Invalid status value"
 */

  resolver.get("/*", function (req, res) {
    var body =  Utils.isCompressedWebUri(urltarget+req.url) ? { DLcompressed: urltarget + req.url } :{ DL: urltarget + req.url }
  
    MongoClient.connect(urlencoded, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("supplier").find(body).toArray(function (err, result) {
        if (err) throw err;
        if (result[0]) {
          console.log(result)

          res.render(__dirname + "/public/index.html",
            {

              url1: result[0].resolverResponse.URL1,
              url2: result[0].resolverResponse.URL2,
              url3: result[0].resolverResponse.URL3



            });
          db.close();
        }
        else {

          res.send("target not added")
        }
      });
    });




  })


  /**
 * @swagger
 * /*:
 * /resolver/api/users/signin:
 *    post:
 *       description: Returns user" 
 *       parameters:
 *       - name:"resolverResponse"
 *       -in : "query"
 *       responses:
 *        "200":
 *          description: "user props with token JWT-TOKEN"
 *        
 *        "405":
 *          description: "Invalid status value"
 */
  /**
 * @swagger
 * /*:
 * /resolver/api/users/signup:
 *    post:
 *       description: Returns user" 
 *       parameters:
 *       - name:"resolverResponse"
 *       -in : "query"
 *       responses:
 *        "200":
 *          description: "user props with token JWT-TOKEN"
 *        
 *        "405":
 *          description: "Invalid status value"
 */

  /**
 * @swagger
 * /*:
 * /resolver/api/allusers/:
 *    get:
 *       description: Returns  all users" 
 *       parameters:

 *       responses:
 *        "200":
 *          description: "all users informations"
 *        
 *        "405":
 *          description: "Invalid status value"
 */


 
 /**
 * @swagger
 * /*:
 * /resolver/api/user/profil:
 *    get:
 *       description: Returns  information of user id" 
 *       parameters:

 *       responses:
 *        "200":
 *          description: "user props with token JWT-TOKEN"
 *        
 *        "405":
 *          description: "Invalid status value"
 */


}