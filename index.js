const express = require('express')
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid'); //For generating ID's
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
app.get('/posts/new',(req,res)=>{
    // console.log('new post')
    res.render('posts/newPost')
    // res.render('posts/newPost');
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
    console.log(req);
    const { postid} = req.params;
    const post = posts.find(p=> p.postid === postid);
    console.log({postid});
    res.render('posts/edit',{post});
})
app.delete('/posts/:postid',(req,res)=>
{   console.log("delete post has been deleted");
    const {postid} = req.params
    posts = posts.filter(p=>p.postid!=postid)
    res.redirect('/posts')
})
app.patch('/posts/:postid',(req,res)=>{
    const { postid } = req.params;
    const oldPostMessage = posts.find(p=> p.postid === postid);
    const newPostMessage = req.body.newPostMassage
    console.log({newPostMessage});
    oldPostMessage.postMessage = newPostMessage
    res.redirect('/posts')
})
app.post('/posts',(req,res)=>{
    console.log("new post has been created");
    const {postUsername}= req.body;
    const {postMessage} = req.body
    const {postName} = req.body
    posts.push({postid:uuid(),name:postName,username:postUsername,postMessage:postMessage,tags: ['#programming', '#coding', '#debugging'],
    likes : 0,
    time : '3:40 pm',
    date : 'Feb 24, 2022'})
    res.redirect('/posts');
})

app.listen(3000, () => {
    console.log('listening on 3000')
})
