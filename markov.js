/** Textual markov chain generator */
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min +  1) + min);
}

const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    // Ensure text is a string
    if (typeof text !== 'string') {
        text = String(text);
    }
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.execute();
}


  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = {}
    const words = this.words;
    let key;
    for(let i=0; i <= words.length; i++) {
      if(i == 0){
        key = words[i];
        continue;
      }
      if(key != words[i]){
        if(Array.isArray(chain[key])){
          chain[key].push(words[i]);
        }
        else{
          chain[key] = words[i];
        }
      }
      key = words[i];
    }
    //console.log(chain);
    return chain;
  }


  /** return random text from chains */

  makeText(numWords = 100, chain) {
    let text = '';
    const keys = Object.keys(chain);
    let first_word = keys[getRandomArbitrary(0, keys.length-1)];
    let next_word;
    let last_word;
    for(let i=0; i < numWords; i++){

      if(last_word == keys[keys.length-1]){
        text += ". ";
        last_word = first_word;
        text += capitalize(first_word);
        continue;
      }
      if(text == ''){
        last_word = first_word;
        text += capitalize(first_word);
      }
      else{
        next_word = chain[last_word];
        if(Array.isArray(next_word)){
          word = next_word[getRandomArbitrary(0, next_word.length-1)];
          text += ` ${word}`;
          last_word = word;
        }
        else{
          text += ` ${next_word}`;
          last_word = next_word;
        }
      }
    }
    console.log(text);
  }

  execute(){
    const chain = this.makeChains();
    this.makeText(10, chain);
  }
}

module.exports = MarkovMachine;