const endpoint = 'https://api.github.com';
const user = 'nkanigsberg';

/** Fetch github repositories */
const fetchRepos = async () => {
  try {
    const response = await fetch(`${endpoint}/users/${user}/repos`);
    const data = await response.json();

    displayRepos(data);
  } catch (error) {
    console.error(error);
  }
}

/** display repo data on page */
const displayRepos = (repos) => {
  const projectsUl = document.getElementById('projects');
  const projectsHeading = document.getElementById('projectsHeading');

  projectsHeading.append(` - ${repos.length}`);

  // loop through repos and append them to page
  repos.forEach(repo => {
    // only if they have a github pages homepage
    if (repo.homepage) {
      const li = document.createElement('li');

      const title = document.createElement('h3');
      const liveLink = document.createElement('a');
      liveLink.setAttribute('href', repo.homepage);
      liveLink.append(repo.name);
      title.append(liveLink);
      li.append(title);

      const description = document.createElement('p');
      description.append(repo.description);
      li.append(description);

      const primaryLanguage = document.createElement('p');
      primaryLanguage.append('Primary language: ', repo.language);
      li.append(primaryLanguage);

      const repoLink = document.createElement('a');
      repoLink.setAttribute('href', repo.html_url);
      repoLink.append('Github Repository');
      li.append(repoLink);

      projectsUl.append(li);
    }
  });

}

// ================== Document Ready ===================== //
(() => {
  fetchRepos();
})();