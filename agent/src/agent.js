const request = require('superagent');

class Agent {
  constructor(credentials) {
    this.credentials = credentials;
  }

  fetchAndProcessAllRepos(owner, nbRepoToKeep, allReposAreAvailable) {
    const targetUrl = `https://api.github.com/orgs/${owner}/repos?state=all&per_page=100`;
    let repos = [];
    function fetchAndProcessPage(pageUrl, credentials) {
      console.log(`Fetching ${pageUrl}`);
      request
        .get(pageUrl)
        .auth(credentials.username, credentials.token)
        .end((err, res) => {
          res.body.forEach((item) => {
            repos = repos.concat({ id: item.id, name: item.name, nb_issues: item.open_issues });
          });
          if (res.links.next) {
            fetchAndProcessPage(res.links.next, credentials);
          } else {
            let topRepos = [];
            repos.sort((elem1, elem2) => elem2.nb_issues - elem1.nb_issues);
            for (let i = 0; i < nbRepoToKeep; i += 1) {
              topRepos = topRepos.concat(repos[i]);
            }
            allReposAreAvailable(null, topRepos);
          }
        });
    }
    fetchAndProcessPage(targetUrl, this.credentials);
  }

  /* TODO asynch ou pas? Faut que je voie encore avec Liechti...
  postTheData(data, url, dataArePosted) {
    console.log('Posting data to the server');
    request
      .post(url)
      .data(data);
    dataArePosted();
  } */
}

module.exports = Agent;
