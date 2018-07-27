const express = require('express');
const model = require('../../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  model.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).send('there was an error fetching the actions')
    })
})

router.get('/:id', (req, res) => {
  model.get(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).send('there was an error fetching the individual action')
    })
})


router.post('/', (req, res) => {
  let { project_id, description, notes, completed } = req.body
  let action = {
    project_id,
    description,
    notes,
    completed
  }
  model.insert(action)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).send('there was an error uploading the action')
  })
})

router.delete('/:id', (req, res) => {
  model.get(req.params.id)
    .then(response => {
      res.status(200).json(response)
      model.remove(req.params.id)
        .then(response2 => {
          res.status(200).send('this post has been deleted')
        })
        .catch(err => {
          res.status(500).send('there was an error deleting the action')
        })
    })
    .catch(err => {
      res.status(404).send('there was an error locating the action')
    })
})

router.put('/:id', (req, res) => {
  let { project_id, description, notes, completed } = req.body
  let changes = {
    project_id,
    description,
    notes,
    completed
  }
  model.update(req.params.id, changes)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(404).send('there was an error locating the action')
    })
})

module.exports = router;
