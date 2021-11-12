const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
//Arriba se inicializa express y aqui se guarda todo en una variable
// para poder usar todo su poder

const newspapers = [
    {
        name:'times',
        address: 'https://www.nytimes.com/section/climate',
        base: 'https://www.nytimes.com'
    },
    {
        name: 'wsj',
        address: 'https://scholar.google.com.co/scholar?q=wsj+climate+change&hl=es&as_sdt=0&as_vis=1&oi=scholart',
        base: ''
    },
    {
        name: 'wpost',
        address: 'https://www.washingtonpost.com/climate-environment/',
        base: ''
    }     
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        $('a:contains("climate")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name
            })
        })
    })
})

app.get('/',(req, res) => {
    res.json('Welcome to my Climate Change News API')
})

app.get('/news',(req,res) =>{
    res.json(articles)
})

app.get('/news/:newspaperId',async(req,res) =>{
    const newspaperId = req.params.newspaperId

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address

    console.log(newspaperAddress)
    //axios.get()
})

app.listen(PORT, () => console.log('server running on PORT ' + PORT))
//y aqui nos aseguramos de que corra nuestro servidor y que lo haga en el puerto
