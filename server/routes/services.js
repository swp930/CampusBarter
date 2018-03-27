var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

var Service = require('../model/services')

router.route('/')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    Service.find(function(err, items) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(items)
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var service = new Service();
    //body parser lets us use the req.body
    service.name = req.body.name;
    service.owner = req.body.owner;
    service.sold = req.body.sold;
    service.desc = req.body.desc;
    service.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Service successfully added!' });
    });
  });



 router.route('/:service_id')
 //The put method gives us the chance to update our comment based on the ID passed to the route
 .get(function(req, res) {
   //looks at our Comment Schema
   Service.findById(req.params.service_id, function(err, items) {
     if (err)
       res.send(err);
     //responds with a json object of our database comments.
     res.json(items)
   });
 })
  .put(function(req, res) {
      Service.findById(req.params.service_id, function(err, service) {
      if (err)
        res.send(err);
      //setting the new author and text to whatever was changed. If nothing was changed
      // we will not alter the field.
      (req.body.name) ? service.name = req.body.name : null;
      (req.body.owner) ? service.owner = req.body.owner : null;
      (req.body.sold) ? service.sold = req.body.sold : null;
      (req.body.desc) ? service.desc = req.body.desc : null;

      //save comment
      service.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Service has been updated' });
      });
    });
  })
  //delete method for removing a comment from our database
  .delete(function(req, res) {
    //selects the comment by its ID, then removes it.
    Service.remove({ _id: req.params.service_id }, function(err, service) {
      if (err)
        res.send(err);
      res.json({ message: 'Service has been deleted' })
    })
  });

  module.exports = router
