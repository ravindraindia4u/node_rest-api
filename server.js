let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('<h1>Hello to Rest</h1>');
});

require("./app/routes/customer.routes.js")(app);

app.listen(3000,()=>{
    console.log(`Server is running at http://localhost:3000/`);
});