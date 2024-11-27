// app.js
const express = require('express');
const bodyParser = require('body-parser');
// const { specs, swaggerUi } = require('./swagger');

const app = express();
app.use(bodyParser.json({
	limit: "50mb"
}));
app.use(bodyParser.urlencoded({
	limit: "50mb",
	extended: true,
	parameterLimit: 50000
}));

const port = 3000;
const sampleRoutes = require('./routes/sample');

const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./swagger.json');

const swaggerUiOptions = {
    customCss: `
      .swagger-ui .topbar {
        padding: 5px 0;
      }
      .swagger-ui .topbar .topbar-wrapper .link {
        display: none;
      }
      .swagger-ui .topbar .topbar-wrapper:before {
        content: url('/logo-xs.png');
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
      }
      .swagger-ui .topbar .topbar-wrapper:after {
        content: "BajajCapital"; 
        font-size: 16px; 
        color: white;
        vertical-align: middle;
        cursor: pointer;
      }
      .swagger-ui .opblock.opblock-get .opblock-summary-method{
        background-color: green;
      }
      .swagger-ui .opblock.opblock-post .opblock-summary-method{
        background-color: blue;
    `,
  };
  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/',sampleRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});