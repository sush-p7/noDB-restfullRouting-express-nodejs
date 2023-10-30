const express = require('express')
const path = require('path')
const app = express()

let i = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let posts = [
    {
        postid: '2',
        name: 'Jhon Doe',
        username: '@jhondoe',
        postMessage: "Why do they call it 'debugging' when it feels more like 'wildly guessing and hoping for the best'?",
        tags: ['#programming', '#coding', '#debugging'],
        likes : 0,
        time : '3:40 pm',
        date : 'Feb 24, 2022'

    }
]
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views path', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/posts', (req, res) => {
    res.render('posts/index', { i ,posts});
})
app.listen(3000, () => {
    console.log('listening on 3000')
})
