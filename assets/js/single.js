var repoNameEl = document.querySelector("#repo-name");
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoName = function () {
  //GRAB REPO NAME FROM URL QUERY STRING
  var queryString = document.location.search;
  var repoName = queryString.split("=")[1];
 
  repoNameEl.textContent = repoName;

  if(repoName) {
    //DISPLAY REPO NAME ON THE PAGE
    repoNameEl.textContent = repoName;

    getRepoIssues(repoName);
  } else {
    //IF NO REPO WAS GIVEN, REDIRECT TO THE HOMEPAGE
    document.location.replace("./index.html");
  }
};

var getRepoIssues = function(repo) {
  //FORMAT THE GITHUB API URL
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  //MAKE A GET REQUEST TO URL
  fetch(apiUrl).then(function(response) {
    // REQUEST WAS SUCCESSFUL
    if (response.ok) {
      response.json().then(function(data) {
        displayIssues(data);

        //CHECK IF API HAS PAGINATED ISSUES
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      //IF NOT SUCCESSFUL, REDIRECT TO HOMEPAGE
      document.location.replace("./index.html");
    }
  });
};

var displayIssues = function(issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }

  //LOOP OVER GIVEN ISSUES
  for (var i = 0; i < issues.length; i++) {
    //CREATE A LINK ELEMENT TO TAKE USERS TO THE ISSUE ON GITHUB
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute('href', issues[i].html_url);
    issueEl.setAttribute('target', '_blank');
    
    //CREATE SPAN TO HOLD ISSUE TITLE
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    //APPEND TO CONTAINER
    issueEl.appendChild(titleEl);

    //CREATE A TYPE ELEMENT
    var typeEl = document.createElement("span");

    //CHECK IF ISSUE IS AN ACTUAL ISSUE OR A PULL REQUEST
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }
    //APPEND TO CONTAINER
    issueEl.appendChild(typeEl);

    //APPEND TO THE DOM
    issueContainerEl.appendChild(issueEl);
  }
};

var displayWarning = function(repo){
//ADD TEXT TO WARNING CONTAINER
limitWarningEl.textContent = "To see more than 30 issues, visit ";

//CREATE LINK ELEMENT
var linkEl = document.createElement("a");
linkEl.textContent = "See more issues on GitHub.com";
linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
linkEl.setAttribute("target", "_blank");

//APPEND TO WARNING CONTAINER
limitWarningEl.appendChild(linkEl);
};

getRepoName();
