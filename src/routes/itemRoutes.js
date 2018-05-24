const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:itemRoutes');

const itemRouter = express.Router();

function router(nav) {
  itemRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'testExpressApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('items');

          const items = await col.find().toArray();

          res.render(
            'itemListView',
            {
              nav,
              title: 'Items',
              items
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  itemRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'testExpressApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('items');

          const item = await col.findOne({ _id: new ObjectID(id) });
          debug(item);
          res.render(
            'itemView',
            {
              nav,
              title: 'Item',
              item
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return itemRouter;
}


module.exports = router;
