const express = require('express')

const app = express()

app.engine('jsx',require ( 'jsx-view-engine').createEngine())
app.set('view engine', 'jsx')
