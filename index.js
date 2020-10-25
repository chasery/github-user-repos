function displayResults(json) {
  // Display our results of the API request
  console.log(json);
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
    .then((json) => displayResults(json))
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
