//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/financecontrol-frontend'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/financecontrol-frontend/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000, function(){
  console.log("Node app is running at localhost:" + app.get('port'));
});
