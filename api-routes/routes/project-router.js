const express = require('express');
const model = require('../../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  model.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).send('there was an error fetching the projects')
    })
})

router.get('/:id', (req, res) => {
  model.get(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).send('there was an error fetching the individual project')
    })
})

router.get('/:id/actions', (req, res) => {
  model.getProjectActions(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).send('there was an error fetching the project actions')
    })
})

router.post('/', (req, res) => {
  let { name, description, completed } = req.body
  let project = {
    name,
    description,
    completed
  }
  model.insert(project)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).send('there was an error uploading the project')
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
          res.status(500).send('there was an error deleting the project')
        })
    })
    .catch(err => {
      res.status(404).send('there was an error locating the project')
    })
})

router.put('/:id', (req, res) => {
  let { name, description, completed } = req.body
  let changes = {
    name,
    description,
    completed
  }
  model.update(req.params.id, changes)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(404).send('there was an error locating the project')
    })
})


module.exports = router;
