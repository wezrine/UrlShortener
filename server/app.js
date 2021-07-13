const express = require('express')
const app = express() 
const cors = require('cors')
const mongoose = require('mongoose')

// Schemas
const Url = require('./schemas/url')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://wezrine:alexander@cluster0.nxus8.mongodb.net/urlShortener?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}, (error) => {
    if(!error) {
        console.log('Successfully connected to MongoDB Database')
    } else {
        console.log(error)
    }
})

app.get('/:slug', (req, res) => {
    const slug = req.params.slug

    // check to see if slug is the right length
    if(slug.length == 7) {
        Url.findOne({slug: slug}, (error, result) => {
            if(error) {
                res.json({error: 'Unable to get URL'})
            } else {
                res.redirect(result.urlInput)
            }
        })
    } else {
        res.json({message: 'That is not a correct URL'})
    }
})

app.post('/shorten-url', (req, res) => {
    const urlInput = req.body.input

    // create slug
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const slug = makeid(7)

    // package url
    let url = new Url({
        urlInput: urlInput,
        slug: slug
    })

    // save package to database
    url.save((error) => {
        if(error) {
            res.json({error: "Unable to save"})
        } else {
            res.json({success: true, message: 'Saved new URL', slug})
        }
    })
})

app.listen(8080, () => {
    console.log('Server is running...')
})