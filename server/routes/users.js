var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

var User = require('../model/users')

router.route('/')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    User.find(function(err, items) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(items)
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var user = new User();
    //body parser lets us use the req.body
    user.name = req.body.name;
    user.messages = req.body.messages;
    user.logid = req.body.logid;
    user.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'User successfully added!' });
    });
  });

  router.route('/:user_id')
  //The put method gives us the chance to update our comment based on the ID passed to the route
    .get(function(req, res) {
      //looks at our Comment Schema
      User.findById(req.params.user_id, function(err, items) {
        if (err)
          res.send(err);
        //responds with a json object of our database comments.
        res.json(items)
      });
    })
   .put(function(req, res) {
       User.findById(req.params.user_id, function(err, user) {
       if (err)
         res.send(err);
       //setting the new author and text to whatever was changed. If nothing was changed
       // we will not alter the field.
       (req.body.name) ? user.name = req.body.name : null;
       (req.body.messages) ? user.messages = req.body.messages : null;
       (req.body.logid) ? user.logid = req.body.logid : null;

       //save comment
       user.save(function(err) {
         if (err)
           res.send(err);
         res.json({ message: 'User has been updated' });
       });
     });
   })
   //delete method for removing a comment from our database
   .delete(function(req, res) {
     //selects the comment by its ID, then removes it.
     User.remove({ _id: req.params.user_id }, function(err, user) {
       if (err)
         res.send(err);
       res.json({ message: 'User has been deleted' })
     })
   });

   router.route('/acc/:logid')
   .get(function(req, res) {
     //looks at our Comment Schema
     User.find({logid: req.params.logid}, function(err, items) {
       if (err)
         res.send(err);
       //responds with a json object of our database comments.
       res.json(items)
     });
   })

module.exports = router
