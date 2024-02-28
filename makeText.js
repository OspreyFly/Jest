/** Command-line tool to generate Markov text. */
const MarkovMachine = require('./markov.js');
const fs = require('fs');
const axios = require('axios');
const sourceType = process.argv[2]
const source = process.argv[3];
let text = '';


if(sourceType == "file"){
  fs.readFile(source, 'utf8', (err, data) => {
    if (err) {
      console.error("Error Fetching Data From File", err);
      return;
    }
    text = data;
    const mm = new MarkovMachine(text);
  });
}

if(sourceType == "url"){
  axios.get(source)
   .then(response => {
    const mm = new MarkovMachine(response.data);
   })
   .catch(error => {
    console.error("Error Fetching Data From URL", error);
   })
}



