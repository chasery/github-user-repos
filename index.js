function createRepoElement(name, url) {
  // Returns the markup for our repo
  console.log(name + " " + url);
  return `<li class="repo"><span class="repo__title">${name}</span><a href="${url}">View Repo</a></li>`;
}
function displayRepos(responseJson) {
  // Display results of the API request
  //$("#jsResults").empty();
  let reposString = responseJson
    .map((repo) => {
      const { name, html_url } = repo;
      createRepoElement(name, html_url);
    })
    .join("");
  console.log(typeof reposString);
  console.log(reposString);
  $("#jsResults").html(reposString);
}

function formEndpointString(username) {
  return `/users/${username}/repos`;
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
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayRepos(responseJson))
    .catch((err) => {
      console.log(`Something went wrong: ${err.message}`);
    });
}

function watchForm(e) {
  // Watch our form for submission and prevent default
  $("#jsGetRepos").submit((e) => {
    e.preventDefault();
    const username = $("#jsUsername").val();
    getUserRepos(username);
  });
}
$(watchForm);
