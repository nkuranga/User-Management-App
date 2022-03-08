const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const {} = require('./models/users')
const db = require('./config.js')
app.use(express.json())
app.use(cors())


app.post('/register', async (req, res) => {
    try {
        const { firstName } = req.body
        const { lastName } = req.body
        const { username } = req.body
        const { password } = req.body
        const newUser = await db.query("INSERT INTO users(firstName,lastName,username,password) VALUES($1,$2,$3,$4)",
            [firstName,lastName,username, password])
        res.json(newUser.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.get('/register', async(req, res)=>{
    try {
        const users = await db.query("SELECT * FROM users WHERE password !=''")
        res.json(users.rows)
    } catch (error) {
        console.error(error.message)
        
    }

})



// app.get('/products/:id', async (req, res) => {

//     try {
//         const { id } = req.params
//         const getProduct = await db.query("SELECT * FROM products WHERE id=$1", [id])
//         res.json(getProduct.rows[0])
//     } catch (err) {
//         console.error(err.message)
//     }

// })

// app.put('/products/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const { name } = req.body
//         const { price } = req.body
//         const updateProduct = await db.query("UPDATE products set name=$1, price=$2 WHERE id=$3",
//             [name, price, id])
//         res.json("Updated!!")
//     } catch (err) {
//         console.error(err.message)

//     }
// })

app.delete('/register/:id', async (req, res) => {
    try {
        const { id } = req.params.id
        const deleteUser = await db.query("DELETE FROM users WHERE id=$1",
            [id])
        res.json(deleteUser.rows)

    } catch (err) {
        console.error(err.message)
    }
})

// search by category

// app.get('/category/', async (req, res) => {

//     try {
//         // const { category } = req.body
//         const getProductCategory = await db.query("SELECT * FROM users")
//         res.json(getProductCategory.rows)
//     } catch (err) {
//         console.error(err.message)
//     }

// })


const port = process.env.PORT || 5000

app.listen(port, console.log(`Connected on port ${port}`))
