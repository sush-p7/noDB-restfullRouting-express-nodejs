const express = require('express')
const methodOverride = require('method-override')
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

    },
    {
        postid: '3',
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
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'resources')));
app.set('views path', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.get('/posts', (req, res) => { 
    // console.log(posts);
    res.render('posts/index', { i ,posts});
})
app.get('/posts/:postid',(req,res)=>{ 
    const {postid} = req.params;
    // console.log(postid);
    const post = posts.find(p => p.postid === postid);
    // console.log({post});
    res.render('posts/show',{post});
    
});

// app.get('/comments/:id', (req, res) => {
//     const { id } = req.params;
//     const comment = comments.find(c => c.id === id);
//     res.render('comments/show', { comment })
// })

app.get('/posts/:postid/edit',(req,res)=>{
    const { postid} = req.params;
    const post = posts.find(p=> p.postid === postid);
    console.log({postid});
    res.render('posts/edit',{post});
})
app.listen(3000, () => {
    console.log('listening on 3000')
})
