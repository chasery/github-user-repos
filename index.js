function createRepoElement(name, url) {
  // Returns the markup for our repo
  return `<li class="repo"><span class="repo__name">${name}</span><a class="repo__anchor" href="${url}" target="_blank">${url}</a></li>`;
}
function displayRepos(responseJson, username) {
  // Display results of the API request
  $("#jsResults").empty();
  let reposString = responseJson
    .map((repo) => {
      const { name, html_url } = repo;
      return createRepoElement(name, html_url);
    })
    .join("");
  $("#jsResults").html(`
    <h2>Repo Results for '${username}'</h2>
    <ul class="repos">${reposString}</ul>
    `);
}

function formEndpointString(username) {
  return `/users/${username}/repos`;
}

function displayError(message) {
  $("#jsResults").html(`
    <p class="error">${message}</p>
  `);
}

function getUserRepos(username) {
  // Use fetch to get our results
  const baseUrl = "https://api.github.com";
  const endpointUrl = formEndpointString(username);
  const url = baseUrl + endpointUrl;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response.status;
    })
    .then((responseJson) => displayRepos(responseJson, username))
    .catch((err) => {
      if (err === 404) {
        displayError(`We couldn't find the user with the name '${username}.'`);
      } else {
        displayError("It seems something is wrong, please try again later!");
      }
    });
}

function watchForm(e) {
  // Watch our form for submission and prevent default
  $("#jsGetRepos").submit((e) => {
    e.preventDefault();
    const input = $("#jsUsername");
    getUserRepos(input.val());
    input.val("");
  });
}
$(watchForm);
