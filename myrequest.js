var request = require("request");
var SCALE_API_KEY = '12345';

var payload = {
  'instruction': '?',
  'callback_url': 'http://www.example.com/callback',
  'instruction': 'Is this company public or private?',
  'attachment_type': 'image',
  'attachment': 'https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-adult-landing-hero.ashx',
  'objects_to_annotate': ['cat', 'dog', 'sheep'],
  'with_labels': false
};

module.exports.doPost = function(){

  request.post('http://localhost:3000/v1/task/annotation', {
    'auth': {
      'user': SCALE_API_KEY,
      'pass': '',
      'sendImmediately': true
    },
    form: payload
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.log(error);
      console.log(response.statusCode);
    }
  });
}

module.exports.postToCallback = function(job){
  var callback_url = job.callback_url;

  console.log("sending to " + callback_url);
  console.log(job);

  request.post(callback_url, {
    form: job
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.log(error);
      console.log(response.statusCode);
    }
  });
}

