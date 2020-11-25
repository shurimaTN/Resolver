const bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var express = require('express')
var fs = require('fs')
var path = require('path');
var mime = require('mime');
var QRCode = require("qrcode-svg");
const { DigitalLink, Utils, } = require('digital-link.js');


var urlencoded = require('../serverconfig/dbconnection')();

/**
 * @swagger
 * definitions:
 *   digitalLinks:
 *     type: object
 *     required:
 *      - domain 
 *      - identifier
 *      - keyQualifiers
 *      - cpv {string} 
 *      - lot {string}
 *      - ser {string} 
 *      - attributes 
 *      - resolverResponse 
 *      - productInfo
 *      - Description 
 *      - LinkType 
 *      - DigitalLinkURI 
 *      - DigitalLinkURI_compressed 
 *     properties:
 *       domain:
 *         type: string
 *       Description:
 *         type: string
 *       cpv:
 *         type: string
 *       lot:
 *         type: string
 *       resolverResponse:
 *         type: array
 *       LinkType:
 *         type: object
 *         properties:
 *       DigitalLinkURI:
 *         type: string
 *         properties:
 *           asManyTargetsAsSpecified:
 *              type: string
 *       identifier:
 *         type: object
 *         properties: 
 *           gtin:
 *              type: string 
 *       keyQualifier:
 *         type: object
 *         properties:
 *           cpv:
 *              type: string
 *           lot:
 *              type: string
 *           ser:
 *              type: string
 *       attributes:
 *         type: object
 *         properties: 
 *           keysattribute:
 *              type: string
 *   DigitalLinkUpdate:
 *     type: object
 *     properties:
 *       OldDigitalLink:
 *         type: string

 * 
 */

module.exports = commun => {

  commun.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  commun.use(bodyParser.json())

  

  commun.use(express.static(__dirname + "/File"));
  commun.engine('js', require('ejs').renderFile);
  commun.engine('.html', require('ejs').__express);
  commun.set('views', __dirname + '/public');
  commun.engine('html', require('ejs').renderFile);
  commun.set('view engine', 'html')
  /**
 * @swagger
 * /commun/create_product:
 *    post:  
 *      description: Insert a new digital link object into the database  
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        required: true
 *        schema:
 *      responses:
 *        "200":
 *          description: 1 document inserted
 *        "404":
 *          description: "Invalid input"
 */


function readhello(testexample){
 if(!testexample.cpv){
   delete testexample.cpv
 } 
 if(!testexample.ser){
  delete testexample.ser
 } 
  if(!testexample.lot ){

  delete testexample.lot
 }

return testexample;

  
}

  commun.post('/create_product', (req, res) => {

    
 



    var objectadd = req.body;

    if (objectadd) {


      MongoClient.connect(urlencoded, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("supplier").insertOne(objectadd, function (err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
      res.status(200)
      res.send("1 document inserted")


    } else {
      res.status(404)
      res.send("Invalid status value")

    }

  });

  /**
   * @swagger
   * /commun/get_product:
   *    get:
   *       description: Returns all  digital links object stored in the DB
   *       responses:
   *        "200":
   *          description: "successful operation"
   *        "405":
   *          description: "Invalid status value"
   *
   
   */
  commun.get('/get_product', (req, res) => {
    if (req.body) {
      MongoClient.connect(urlencoded, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("supplier").find({}).toArray(function (err, result) {
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



  });

  /**
    * @swagger
    * /commun/download:
    *    get:
    *       description: Returns APK QRcode reader
    *       responses:
    *        "200":
    *          description: "successful operation"
    *             
    *        "405":
    *          description: "Invalid status value"
    *
    *
    *
    */
  commun.get('/download', function (req, res) {

    var file = __dirname + '/File/QrcodeResolver.apk'
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
  });

  /**
    * @swagger
    * /commun/index:
    *    get:
    *       description: Returns index vide
    *       responses:
    *        "200":
    *          description: "successful operation"   
    *        "405":
    *          description: "Invalid status value"
    *
    *
    *
    */

  commun.get('/index', function (req, res) {


    res.render(__dirname + "/File/index.html");
  })


  /**
  * @swagger
  * /commun/*:
  *    post:
  *      description: find LINK URL LIST WITH POST DL FROM DB
  *      parameters:
  *      - in: "body"
  *        name: "body"
  *        required: true
  *      responses:
  *        "200":
  *          description: 1 document inserted
  *        "404":
  *          description: "Invalid input"
  */

  commun.post('/*', (req, res) => {



    MongoClient.connect(urlencoded, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("supplier").find(req.body).toArray(function (err, result) {
        if (err) throw err;
        if (result.length > 0) {

          console.log(result)
          res.render(__dirname + "/File/index.html", {
            url1: result[0].resolverResponse

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
   * /commun/Update:
   *    put:
   *       description: Updates the digital link using the old value  of DigitalLinkURI as a filtering reference , so the body should include two keys please see the DigitalLinkUpdate model
   *       parameters:
   *       - in: "body"
   *         name: "body"
   *         required: true
   *       responses:
   *        "200":
   *          description: "successful operation"
   *        "500":
   *          description: "Error in deletion"
   *
   *
   *
   */
  commun.put('/Update', function (req, res) {
    gtinLinks.updateOne({ 'DigitalLinkURI': req.body.OldDigitalLink }, req.body.NewDigitalLink, function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send(doc);
    });
  });


  /**
   * @swagger
   * /commun/deleteAll:
   *    delete:
   *       description: to be used for deletion, for the moment it will delete every record in the database , once the supliers are added to the dataschema an argument to specify which supplier's data will be removed entirely
   *       responses:
   *        "200":
   *          description: "successful operation"
   *        "500":
   *          description: "Error in deletion"
   
   */
  commun.delete('/deleteAll', async function (req, res) {
    gtinLinks.deleteMany({}, function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send('Succesfully deleted.');
    });
  });
  /**
   * @swagger
   * /commun/deleteOne:
   *    delete:
   *       description: Deletes a single entry from the database using the DigitalLinkURI as a filter
   *       parameters:
   *       - in: "body"
   *         name: "body"
   *         required: true 
   *         schema:
   *           type: object
   *           properties:
   *             DigitalLinkURI: 
   *                type: string
   *       responses:
   *        "200":
   *          description: "successful operation"
   *        "500":
   *          description: "Error in deletion"
   */
  commun.delete('/deleteOne', function (req, res) {
    gtinLinks.deleteOne(req.body, function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send('Succesfully deleted.');
    });
  });
}