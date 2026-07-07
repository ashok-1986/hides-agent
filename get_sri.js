const https = require('https');
const crypto = require('crypto');
function get(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) loc = 'https://unpkg.com' + loc;
        return resolve(get(loc));
      }
      let d = '';
      res.on('data', c => d+=c);
      res.on('end', () => resolve('sha384-' + crypto.createHash('sha384').update(d).digest('base64')));
    });
  });
}
Promise.all([
  get('https://unpkg.com/lucide@0.412.0/dist/umd/lucide.min.js'), 
  get('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js')
]).then(console.log);
