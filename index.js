var https = require('https');

console.log('Pick a subreddit');
var url = 'https://www.reddit.com/r/programming.json';

https.get(url, (res) => {
  res.setEncoding('utf8');
  var rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  });

  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`error: ${e.message}`);
});
