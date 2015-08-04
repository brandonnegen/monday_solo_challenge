var express = require('express');
var router = express.Router();//Router has to be capitalized
var path = require('path');
var studentData = require('../public/data/students.json')

router.get("/data", function(req, res){
    res.json(studentData);
});

router.get("/*", function(req, res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;