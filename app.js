const Vexpress = require('express');
const bodyparser = require('body-parser')
const app = Vexpress()
const port = 3000

app.use(bodyparser.json());

const vapp = {
    id: 1,
    name: 'App 1',
    obj: {
        name: 'beka'
    }
};

console.log(vapp.name);


const apps = [
    {id: 1, name: 'App 1'},
    {id: 2, name: 'App 2'},
    {id: 3, name: 'App 3'},
    {id: 4, name: 'App 4'},
    {id: 5, name: 'App 5'}
]

app.get('/app', (req,res) =>{
    res.json(apps);
})

app.get('/app/:id', (req,res) =>{
    const vid = parseInt(req.params.id);
    const result = apps.find(app => app.id === vid)
    res.json(result)
})

app.get('/index', (req,res) => {
    res.status(200).sendFile(__dirname + '/views/index.html')
})

app.post('/app', (req,res) =>{
    const vbody = req.body;
    const lenofapps = apps.push(vbody)
    res.status(201).json({
        status: true,
        message: 'app created successfuly',
        result: lenofapps
    })
})

app.put('/app/:id', (req,res) =>{
    const vid = parseInt(req.params.id);
    const vbody = req.body;
    const result = apps.find(app => app.id === vid)
    res.json(result)
    result.name = vbody.name;
    res.json({
        status: true,
        message: "yes",
        result: result
    });
})

app.delete('/app/:id', (req,res) =>{
    const vid = parseInt(req.params.id)
    const result = apps.find((app) => {
        return app.id === vid
    });
    const index = apps.indexOf(result);
    apps.splice(index, 1);
    res.json({
        status: true,
        message: "განცხადება წარმატებით წაიშალა!",
        result:result
    });
})

app.listen(port, () =>{
    console.log(`this is your port ${port}`);
})