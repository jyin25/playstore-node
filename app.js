const express = require('express');
const morgan = require('morgan')
const data = require('./data');
const app = express();


app.get('/apps', (req, res) => {
  const {sort, genres = ''} = req.query;

  const lowerCaseGenres = genres.toLowerCase()

  if(sort) {
    if(!['Rating', 'App'].includes(sort)) {
      res.status(400).send('must sort by rating or app')
    }
  }
  console.log(sort)

  if(genres) {
    if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(lowerCaseGenres)) {
      res.status(400).send('must include Action, Puzzle, Strategy, Casual, Arcade, Card')
    }
  }

  let results = data.filter(data => data.Genres.toLowerCase().includes(lowerCaseGenres))

  if(sort) {
    results.sort((a,b) => {
      return a[sort] > b[sort]? 1: a[sort] < b[sort]? -1 :0
    });
  }

  res.json(results)
})

module.exports = app;