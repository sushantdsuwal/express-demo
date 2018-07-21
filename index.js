const Joi = require('joi');
const express = require('express'); 
const app = express(); 

app.use(express.json());

const courses = [ {id:1, name:'courses1'},  {id:2, name:'courses2'},  {id:3, name:'courses3'},  {id:4, name:'courses5'},  {id:5, name:'courses6'}
]; 

app.get('/', (req, res) =>  {
 res.send('hello world'); 
}); 

app.get('/api/courses', (req, res) =>  {
    res.send(courses); 
});

app.get('/api/courses/:id', (req, res) =>  {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The course with the given ID was not found');
   res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // result.erro
    if(error){
        //400 bad request
        res.status(400).send(result.error.details[0].message)
        return;
    };

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
    
});

app.put('/api/courses/:id', (req, res) =>  {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    // const result = validateCourse(req.body)
    const { error } = validateCourse(req.body); // result.erro
    if(error){
        //400 bad request
        res.status(400).send(result.error.details[0].message)
        return;
    };

    //update course
    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) =>  {
    //look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});


app.get('/api/posts/:year/:month', (req, res) =>  {
    res.send(req.query); 
});
//http://localhost:5000/api/posts/2018/2?sortBy=name

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
};


//Enviroment Variables (PORT)
const port = process.env.PORT || 3000
app.listen(port, () => console.log('listening on port', port))