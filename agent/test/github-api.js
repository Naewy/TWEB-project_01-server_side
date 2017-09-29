const chai = require('chai');
const request = require('superagent');
const { username, token } = require('../github-credentials.json');

const should = chai.should();

describe('The GitHub API', () => {
  it('allows me to get a list of repos', (done) => {
    const organization = 'microsoft';
    const url = `https://api.github.com/org/${organization}/repos?page=1&per_page=100`;
    request
      .get(url)
      .auth(username, token)
      .set('Accept', 'application/vnd.github.v3+json')
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });
});
