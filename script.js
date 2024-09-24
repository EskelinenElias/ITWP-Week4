// function for fetching data from address
async function getData(address) {
  try {
    const response = await fetch(address);
    if (!response.ok) {
      throw new Error("Something went wrong while attempting to fetch data.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(
      "Something else went wrong while attempting to fetch data: ",
      error,
    );
  }
}

// function for adding a new row to the end of the table
function appendRow(municipalityName, populationNumber, employmentAmount, employmentRate) {
  // create a new row
  const tableData = document.getElementById("table-data");
  const row = document.createElement("tr");
  const municipalityCell = document.createElement("td");
  const popukationCell = document.createElement("td");
  const employmentCell = document.createElement("td");
  const employmentRateCell = document.createElement("td");
  // populate row with data
  municipalityCell.innerText = municipalityName;
  popukationCell.innerText = populationNumber;
  employmentCell.innerText = employmentAmount;
  employmentRateCell.innerText = `${employmentRate.toFixed(2)} %`;
  // add the row to the table
  row.appendChild(municipalityCell);
  row.appendChild(popukationCell);
  row.appendChild(employmentCell);
  row.appendChild(employmentRateCell);
  tableData.appendChild(row);
  // apply conditional styling according to employment rate
  if (employmentRate > 45) {
    row.style.backgroundColor = "#abffbd"; 
  } else if (employmentRate < 25) {
    row.style.backgroundColor = "#ff9e9e";
  }
}

// function for updating the table data
async function updateTable() {
  const populationDataUrl =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const employmentDataUrl =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  console.log("Updating table...");
  // fetch data
  const populationData = await getData(populationDataUrl);
  const employmentData = await getData(employmentDataUrl);
  // update table
  if (populationData && employmentData) {
    // extract relevant data
    const labels = populationData.dataset.dimension.Alue.category.label;
    const indices1 = populationData.dataset.dimension.Alue.category.index;
    const values = populationData.dataset.value;
    const indices2 = employmentData.dataset.dimension["Työpaikan alue"].category.index;
    const employmentAmounts = employmentData.dataset.value;
    // add data to table
    for (let key in labels) {
      let municipalityName = labels[key];
      let index1 = indices1[key];
      let populationNumber = values[index1];
      let index2 = indices2[key];
      let employmentAmount = employmentAmounts[index2];
      let employmentRate = (employmentAmount / populationNumber * 100); 
      let row = appendRow(municipalityName, populationNumber, employmentAmount, employmentRate);
    }
  }
  console.log("Table updated.");
}

// run app
updateTable();
