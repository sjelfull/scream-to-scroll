var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var request = require('request')
var cdnex = require('cdnex')
var port = process.env.PORT || 4000;
const got = require('got');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

app.post('/api/browser', function (req, res) {
    console.log(req.body);
    if (req.body.url) {
        got.get(req.body.url)
        .then(response => {
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type']) // 'image/png'
            res.setHeader('content-type', response.headers['content-type']);

            cdnex.render({
                src: response.body,
                url: req.body.url,
                pattern: '**/*.{html,css,js}'
            }).then(function(rendered) {
                res.send(rendered);
            }).catch(function(err) {
                console.error(err);
            })

        }).catch(error => {
            console.log(error.response.body);
            //=> 'Internal server error ...'
        });
    } else {
        res.json({ error: 'No url set!' })
    }
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})