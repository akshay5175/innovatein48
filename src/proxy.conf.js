
var defaultTarget = 'https://krmfis.atlassian.net/rest/api/2/';
module.exports = [
  {
    context: ['/search?**'],
    target: defaultTarget,
    changeOrigin: true,
  }
];
