const express = require('express');

const nav1Router = express.Router();

function router(nav) {
  nav1Router.route('/').get((req, res) => {
    res.render('nav1', {
      siteName: 'Node & Express',
      nav
    });
  });

  nav1Router.route('/:id').get((req, res) => {
    const { id } = req.params;

    res.render('nav1', {
      siteName: 'Node & Express',
      nav,
    });
  });

  return nav1Router;
}

module.exports = router;
