const app = require('./src/serverconfig/server');
require('./src/modulecommun/commun')(app)
require('./src/modulecommun/resolver')(app)
const express = require('express');
var doc = express()
const bodyParser = require('body-parser');


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Resolver api ",
      description: "The resolver manages digital links and their target links ",

      contact: {
        name: "Whatever"
      },
      servers: ["http://3.21.109.168:3005"]

    },

  }, apis: [ './src/modulecommun/commun.js'  ,'./src/modulecommun/resolver.js'   ] //use  apis: ['./ src/*.js']  if you need to see older documentation, suppressed because not useful for now

};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
doc.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
doc.listen(3005, () => {
  console.log('doc launch on port', 3005);
});
app.listen(app.get('port'), () => {
  console.log('server launch on port', app.get('port'));
});