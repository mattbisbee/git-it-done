 var issueContainerEl = document.querySelector("#issues-container")
 
 var getRepoIssues = function(repo) {
   var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
   fetch(apiUrl).then(function(response) {
     // REQUEST WAS SUCCESSFUL
     if (response.ok) {
       response.json().then(function(data) {
         displayIssues(data);
       });
     } else {
       alert("There was a problem with your request!");
     }
   });
 };

 var displayIssues = function(issues) {
   for (var i = 0; i < issues.length; i++) {
     //CREATE A LINK ELEMENT TO TAKE USERS TO THE ISSUE ON GITHUB
     var issueEl = document.createElement("a");
     issueEl.classList = "list-item flex-row justify-space-between align-center";
     issueEl.setAttribute('href', issues[i].html_url);
     issueEl.setAttribute('target', '_blank');
     issueContainerEl.appendChild(issueEl);
  
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
  }
 };

 getRepoIssues("facebook/react");