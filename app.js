const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const nav = [
  {
    link: '/nav1',
    title: 'NavItem1'
  },
  {
    link: '/nav2',
    title: 'NavItem2'
  }
];

const nav1Router = require('./src/routes/nav1Routes')(nav);

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/nav1', nav1Router);
app.get('/', (req, res) => {
  res.render('index', {
    siteName: 'Node & Express',
    nav: [
      {
        link: '/nav1',
        title: 'NavItem1'
      },
      {
        link: '/nav2',
        title: 'NavItem2'
      }]
  });
});

app.listen(port, () => {
  debug(chalk.green(`Listening on port ${port}`));
});
