// sources: see file README.md

// a function for fetching show data usign a search phrase
async function fetch_show(show) {
  try {
    const address = `https://api.tvmaze.com/search/shows?q=${show}`;
    const response = await fetch(address);
    if (!response.ok) {
      throw new Error("Something went wrong while attempting to fetch data.");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Something else went wrong while attempting to fetch data: ", error);
  }
}

// a function for creating a new showData element 
function newShowData(item) {
  const showContainer = document.getElementById('show-container');

  // create div for the show-data element
  const showDataDiv = document.createElement('div');
  showDataDiv.className = 'show-data';
  showContainer.appendChild(showDataDiv);

  // create image element
  if (item.show.image) {
    const image = document.createElement('img');
    image.src = item.show.image.medium;
    showDataDiv.appendChild(image);
  }

  // create a div element for show info
  const showInfoDiv = document.createElement('div');
  showInfoDiv.className = 'show-info';
  showDataDiv.appendChild(showInfoDiv);

  // create title element
  const title = document.createElement('h1');
  title.textContent = item.show.name;
  showInfoDiv.appendChild(title);

  // create summary element
  const summary = document.createElement('div');
  summary.innerHTML = item.show.summary;
  showInfoDiv.appendChild(summary);
}

// function for adding search results to the webpage
function showResults(json) {
  const showContainer = document.getElementById('show-container');

  // check if no shows were found
  if (json.length === 0) {
    const show = document.getElementById('input-show').value;
    showContainer.innerHTML = `<p>No shows found with '${show}'.</p>`;
    console.log("No shows found.")
    return;
  }
  // add shows to show container
  json.forEach(item => {
    // create new showData element
    newShowData(item); 
  })
}

// function for backend testing
async function search(show) {
  console.log(`Fetching ${show}...`);
  json = await fetch_show(show);
  console.log(`Populating webpage with results...`);
  showResults(json);
  console.log("Ready!");
}

// function for performing a search
async function submit_form(event) {
  event.preventDefault();
  const showContainer = document.getElementById('show-container');
  const show = document.getElementById('input-show').value;
  showContainer.innerHTML = '';
  console.log(`Fetching ${show}...`)
  const json = await fetch_show(show);
  showResults(json);
}

// main function
function main() {
  // add event listener to input form
  document.getElementById('search-form').addEventListener('submit', submit_form);
}

// run app
main()

// search("friends");
