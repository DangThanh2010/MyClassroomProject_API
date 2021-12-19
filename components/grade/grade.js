const controller = require('./gradeController')
const express = require('express');

const router = express.Router();

router.get('/grade', function (req, res) {
    res.json();
})