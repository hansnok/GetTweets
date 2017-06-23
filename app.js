
const search = require('./search.js');

var keywords = [
  '@bbvachile',
  '@santanderchile',
  '@bancobci',
  '@banco_security',
  '@bancobice',
  '@bancodechile',
  '@itauchile',
  '@banco_falabella',
  '@bancoestado',
  '@scotiabank_cl',
  '@corpbanca'
];
console.log('Los hashtag a buscar son ' + keywords);

for (var i = 0; i < keywords.length; i++) {
  search.getTweets(keywords[i], function(callback) {
    console.log('respuesta de '+ callback.banco);
    search.insertData(callback.tweets, callback.banco);
  });
}
