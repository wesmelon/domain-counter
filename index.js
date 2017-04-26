var https = require('https');

console.log('Pick a subreddit');
var url = 'https://www.reddit.com/r/programming/top.json?limit=100';

function countDomain(children) {
  var m = new Map();
  for (let child of children) {
    var domain = child.data.domain;
    if (m.has(domain)) {
      m.set(domain, m.get(domain)+1);
    } else {
      m.set(domain, 1);
    }
  }

  var iter = m.entries();
  var highest = Array.from(iter)
    .sort((a, b) => a[1] - b[1])
    .reverse()
    .filter(i => i[1] > 1);
  console.log(highest);
}

https.get(url, (res) => {
  res.setEncoding('utf8');
  var rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  });

  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      countDomain(parsedData.data.children);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`error: ${e.message}`);
});
