const express = require('express');
const router = express.Router();
const storiesController = require('../controllers/stories');

router.get('/', storiesController.index);
router.get('/:id', storiesController.show);
router.post('/', storiesController.create);

module.exports = router;
