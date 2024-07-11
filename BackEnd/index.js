const express= require('express');
const bodyParser =require('body-parser');
const http= require('http');
const router =require('./router/routes')
const cors =require('cors');
const app = express()
app.use(cors());
const { exec } = require('child_process');
require('dotenv').config()
const server= http.createServer(app);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',router)

const PORT=process.env.PORT || 3005;


server.listen(PORT, () => {
  exec(`npx json-server --watch db.json --port 2000`, (err, out) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(out)
  });
  console.log(`listening on *:${PORT}`);
});