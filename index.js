const express = require('express')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

//Initial env variables
dotenv.config()


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// // Static folder the public 
// app.use(express.static(path.join(__dirname, 'public')))

// // Define the '/data' route
// app.get('/data', (req, res) => {
//   // Read the JSON file
//   const jsonData = require('./database/data.json');
//   res.json(jsonData);
// });

fs.readFile( './data.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    const id = jsonData.id;
    const title = jsonData.title;
    const author = jsonData.author;

    // Generate the HTML
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Books</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-3">
              <div class="card mb-3 mt-2">
                <img src="" class="rounded-circle float-start" alt="...">
                <div class="card-body">
                  <h5 class="card-title"># <span >${id}</span></h5>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Title: 
                    <span >${title}</span>  
                    </li>
                    <li class="list-group-item">Author: <span >${author}</span></li>
                  </ul>
                </div>
                <div class="card-footer">
                <button class="btn-delete"><a type="button" class="btn btn-danger">Delete</a></button>  
                
                </div>
              </div>
          </div>
        </div>
      </div>
      
    </body>
    </html>`;

    // Write the HTML to a file
    fs.writeFile('output.html', html, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('HTML file generated successfully');
    });
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 3000

const start=(req,res) =>{
 app.listen(PORT, console.log(`Server is running on PORT :${PORT}`))
}

start()