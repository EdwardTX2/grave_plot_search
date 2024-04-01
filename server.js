const express = require('express')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const app = express()
const PORT = 5000

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

app.use(express.urlencoded({extended: true }))
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', {records: null})
})

app.get('/search', async (req, res) => {
    const { lastName, firstName, birthYear, deathYear } = req.query
    let query = supabase
      .from('grave_register')
      .select(`
      last_name,
      first_name,
      birth_year,
      death_year,
      lot_number
      `)
      .order('last_name', {ascending: true})

    if (lastName) {
        query = query.ilike('last_name', `%${lastName}%`)
    }
    if (firstName) {
        query = query.ilike('first_name', `%${firstName}%`)
    }
    if (birthYear) {
        query = query.eq('birth_year', birthYear)
    }
    if (deathYear) {
        query = query.eq('death_year', deathYear)
    }
    // select * from grave_register where last_name like ('%lastName%')
    // order by last_name asc;
    //console.log(query)
    try {
        let { data, error } = await query
        if (error) {
            throw error
        }
        //console.log(data)
        res.render('index', {records: data})
    } catch (error) {
        console.error('Error:', error.messsage)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})