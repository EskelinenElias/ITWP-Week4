
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
  
function newShowData(item) {
  const showContainer = document.getElementById('show-container');

  // create div for the show-data element
  const showDataDiv = document.createElement('div');
  showDataDiv.className = 'show-data';
  showContainer.appendChild(showDataDiv);

  // create image element
  if (item.show.image.medium) {
    const image = document.createElement('img');
    image.src = item.show.image.medium;
    showDataDiv.appendChild(image);
  }

  // Create the info div
  const showInfoDiv = document.createElement('div');
  showInfoDiv.className = 'show-info';
  showDataDiv.appendChild(showInfoDiv);

  // Create the title element
  const title = document.createElement('h1');
  title.textContent = item.show.name;
  showInfoDiv.appendChild(title);

  // Append summary directly since it's already in <p> tags
  const summary = document.createElement('div');
  summary.innerHTML = item.show.summary;
  showInfoDiv.appendChild(summary);
}

function showResults(json) {
  const showContainer = document.getElementById('show-container');

  // check if no shows were found
  if (json.length === 0) {
      showContainer.innerHTML = '<p>No shows found.</p>';
      console.log("No shows found.")
      return;
  }
  // add shows to show container
  json.forEach(item => {
    // create new showData element
    newShowData(item); 
  })
}

async function search(show) {
  console.log(`Fetching ${show}...`);
  json = await fetch_show(show);
  console.log(`Populating webpage with results...`);
  showResults(json);
  console.log("Ready!");
}

async function submit_form(event) {
  event.preventDefault();
  const show = document.getElementById('input-show').value;
  console.log(`Fetching ${show}...`)
  const json = await fetch_show(show);
  showResults(json);
}

// add event listener to input form
document.getElementById('search-form').addEventListener('submit', submit_form);

// search("friends");
