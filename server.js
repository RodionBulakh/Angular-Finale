const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/angular-module'));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist/angular-finale/' });
});

app.listen(process.env.PORT || 8080);
