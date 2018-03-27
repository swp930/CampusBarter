var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

var Item = require('../model/items')

router.route('/')
    //retrieve all comments from the database
    .get(function(req, res) {
        //looks at our Comment Schema
        Item.find(function(err, items) {
            if (err)
                res.send(err);
            //responds with a json object of our database comments.
            res.json(items)
        });
    })
    //post new comment to the database
    .post(function(req, res) {
        var item = new Item();
        //body parser lets us use the req.body
        item.name = req.body.name;
        item.owner = req.body.owner;
        item.sold = req.body.sold;
        item.desc = req.body.desc;
        item.save(function(err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Item successfully added!'
            });
        });
    });

router.route('/:item_id')
    //The put method gives us the chance to update our comment based on the ID passed to the route
    .get(function(req, res) {
      //looks at our Comment Schema
      Item.findById(req.params.item_id, function(err, items) {
        if (err)
          res.send(err);
        //responds with a json object of our database comments.
        res.json(items)
      });
    })
    .put(function(req, res) {
        Item.findById(req.params.item_id, function(err, item) {
            if (err)
                res.send(err);
            //setting the new author and text to whatever was changed. If nothing was changed
            // we will not alter the field.
            (req.body.name) ? item.name = req.body.name: null;
            (req.body.owner) ? item.owner = req.body.owner: null;
            (req.body.sold) ? item.sold = req.body.sold: null;
            (req.body.desc) ? item.desc = req.body.desc: null;

            //save comment
            item.save(function(err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'Item has been updated'
                });
            });
        });
    })
    //delete method for removing a comment from our database
    .delete(function(req, res) {
        //selects the comment by its ID, then removes it.
        Item.remove({
            _id: req.params.item_id
        }, function(err, item) {
            if (err)
                res.send(err);
            res.json({
                message: 'Item has been deleted'
            })
        })
    });

module.exports = router
