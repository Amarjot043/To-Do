const express = require("express");
const bodyParser = require("body-parser");
const { resolveSoa } = require("dns");

var tasks = [];
var workTasks = [];

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/", (req, res) => { 
    var today = new Date();
    var options = {
        weekday:"long",
        day: "numeric",
        month: "long",
        
    };

    var day = today.toLocaleDateString("en-US",options);



    res.render("list", { listTitle: day,action:"/",newListItems:tasks});
});

app.post("/", (req, res) =>{
    var task = req.body.todo;
    if(task !=""){
    tasks.push(task);
    }
    res.redirect("/");
    
});







app.get("/work", (req, res) =>{
    res.render("list",{listTitle:"Work List",action:"/work",newListItems: workTasks})
});

app.post("/work", (req, res) =>{
    let item = req.body.todo;

    if(item != ""){
    workTasks.push(item);
    }
    res.redirect("/work");
})
 





app.listen(3000, () => {
    console.log("server started on port 3000");
})