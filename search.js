
var Twit = require('twit');
var config = require('./config_twitter');
var T = new Twit(config);

var mysql = require('mysql');
var con = mysql.createConnection({
  host:         '',
  user:         '',
  password:     '',
  database:     ''
});

// Busca tweet de acuerdo a la variable keyword
// Retorna set de tweet encontrados, maximo 100, y el banco correspondiente
var getTweets = (keyword, callback, banco) => {
  bank = keyword;
  getID(keyword, function(data){
    var params = {
      q: keyword,
      count: 100,
      since_id: data
    };
    // API Twitter to search
    T.get('search/tweets', params, function(err, data, response) {
      //insertData(data.statuses);
      callback({tweets: data.statuses, banco: keyword} );
    });
  });
};

// Dato un banco busca el ID del ultimo Tweet guardado
// para pedir a Twitter desde ese ID
function getID(bank, since_id) {
  var objeto = con.query('SELECT id, id_tweet FROM data WHERE bank = "' +bank + '" ORDER BY id DESC LIMIT 1',
    function (err, result, fields) {
      if (err) throw err;
      if (typeof result[0] !== 'undefined' && result[0] !== null) {
        since_id(result[0].id_tweet);
      }else {
          since_id(0);
      }
  });
}

// Guardar los Tweets pedidos por la API de Twitter
function insertData(result, banco) {
  var sql = 'INSERT INTO data (id_tweet, bank, time, text, language) VALUES ?';
  var values = [];
  for (var i = 0; i < result.length; i++) {
    var d = new Date(result[i].created_at);
    var text = (result[i].text).replace(/\\/g, "\\\\")
               .replace(/\$/g, "\\$")
               .replace(/'/g, "\\'")
               .replace(/"/g, "\\\"");
    console.log('id tweet '+result[i].id);
    console.log('time del tweet '+d.getTime());
    values.push([
      result[i].id,
      banco,
      d.getTime(),
      text,
      result[i].lang
    ]);
  }
  var insert = con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}

module.exports = {
  getTweets,
  insertData
};
