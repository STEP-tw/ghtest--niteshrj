const https = require('https');

const username = process.argv[2];

const getOptions = function(){
  const options = {
    hostname: 'api.github.com',
    path: `/users/${username}/repos`,
    //Insert your Github access_token below :-
    access_token : 'XXX-XXX',
    headers: {
      'User-Agent': 'Request-Promise',
    },
  };
  return options;
}

const getRepos = function(){
  return new Promise((resolve,reject) => {
    const req = https.get(getOptions(), (res) => {
      let repos = '';
      res.on('data', (chunk) => repos += chunk );
      res.on('end',() => resolve(JSON.parse(repos)) );
    })
    req.on('error', (err) => reject(err));
  })
}

const printRepos = (repos) => repos.forEach((repo,index) => console.log(`${index+1} ${repo.name}`))

getRepos()
  .then((repos)=>{
    console.log(`${username} has ${repos.length} repositories. \n`);
    printRepos(repos);
  })
  .catch((err) => console.log(err))
