$(document).ready(function () {
  $("#datePick").multiDatesPicker({ dateFormat: "yy-mm-dd" });
});
document.getElementById("addRowButton").addEventListener("click", () => {
  document.getElementById("addRowButton").addEventListener("click", () => {
    const leadCount = parseFloat(document.getElementById("leadCount").value);
    const totalDays = parseInt(
      document.getElementById("totalDays").textContent
    );

    if (!isNaN(leadCount) && totalDays !== 0) {
      const expectedDRR = leadCount / totalDays;
      document.getElementById("expectedDRR").value = expectedDRR.toFixed(2);
    } else {
      alert(
        "Please fill in valid Lead Count and calculate the Number of Days."
      );
      return;
    }
  });

  const action = "N/A";
  const id = document.getElementById("id").value;
  const startDate = document.getElementById("start_date");

  const endDate = document.getElementById("end_date");
  const monthYear = document.getElementById("month_year_cell").textContent;
  const leadCount = document.getElementById("leadCount").value;
  const expectedDRR = document.getElementById("expectedDRR").value;

  const excludesDate = document.getElementById("date");

  const totalDaysCell = document.getElementById("totalDays");

  function countDaysBetweenDates(startDate, endDate, excludedDates) {
    const oneDay = 24 * 60 * 60 * 1000;
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    let totalDays = 0;

    for (
      let current = start;
      current <= end;
      current.setDate(current.getDate() + 1)
    ) {
      const currentDateStr = current.toISOString().split("T")[0];
      if (!excludedDates.includes(currentDateStr)) {
        totalDays++;
      }
    }

    return totalDays;
  }
  let selectedDates = [];
  const dateInput = document.getElementById("datePick");
  function getSelectedDates() {
    selectedDates = $("#datePick").multiDatesPicker("getDates");
    let selectedDatesString = selectedDates.join(", ");

    return selectedDatesString;
  }
  dateInput.addEventListener("change", (e) => {
    const selectedDate = dateInput.value;
    if (selectedDates.includes(selectedDate)) {
      alert("Date already selected.");
    } else {
      selectedDates.push(selectedDate);
      displaySelectedDates();
      updateTotalDays(startDate, endDate, selectedDates);
    }
  });

  let x = countDaysBetweenDates(startDate, endDate, getSelectedDates());

  startDate.addEventListener("change", () => {
    updateTotalDays(startDate.value, endDate.value, getSelectedDates());
  });

  endDate.addEventListener("change", () => {
    updateTotalDays(startDate.value, endDate.value, getSelectedDates());
  });

  dateInput.addEventListener("change", () => {
    updateTotalDays(startDate.value, endDate.value, getSelectedDates());
  });

  function displaySelectedDates() {
    $(document).ready(function () {
      let now = new Date();
      let today =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      
      $("#datePicker").val(today);
    });
    let sDate = document.getElementById("start_date").textContent;

    let startDateValue = startDate.value;

    let endDate = document.getElementById("end_date");

    let selectedDates = $("#datePick").multiDatesPicker("getDates");

    let selectedDatesString = selectedDates.join(", ");
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    

    const Id = generateRandomID();

    const newRow = document.querySelector("table").insertRow(-1);
    newRow.innerHTML = `
     <td></td>
    <td>${Id}</td>
     <td>${startDateValue}</td>
    <td>${endDate.value}</td>
    <td>${monthYear}</td>
    <td>${selectedDatesString}</td>
    <td>${x}</td>
    <td>${leadCount}</td>
    <td>${parseInt(leadCount / x)}</td>
    <td>${formattedDateTime}</td>
  `;
  
  function button (){
    const id =  generateRandomID();
    const startDate = document.getElementById("start_date");
    
  
    const endDate = document.getElementById("end_date");
   const monthYear = document.getElementById("month_year_cell").textContent;
    const leadCount = document.getElementById("leadCount").value;
    const expectedDRR = document.getElementById("expectedDRR").value;
    localStorage.setItem('id', id);
    localStorage.setItem('startDate', newRow);
    
  
  }
    $("#datePick").multiDatesPicker("resetDates");
    $("#start_date").val("");
    $("#end_date").val("");
    $("#leadCount").val("");
    
  }
     
  document.getElementById("expectedDRR").value = "";
  document.getElementById("datePick").value = "";

  displaySelectedDates();
  totalDaysCell.textContent = "";
});
document.getElementById("start_date").value = "";
document.getElementById("end_date").value = "";

function generateRandomID() {
  return Math.floor(Math.random() * 100);
}

function updateRow() {
  const updatedAction = "N/A";
  const actionCell = document.querySelector("tr td:nth-child(1)");
  actionCell.textContent = updatedAction;
}

const editableFields = document.querySelectorAll(".editable");
editableFields.forEach((field) => {
  field.addEventListener("input", updateRow);
});

function updateTable() {
  const startDateInput = document.getElementById("start_date");
  const endDateInput = document.getElementById("end_date");
  const excludesDateCell = document.getElementById("datePick");
  const totalDaysCell = document.getElementById("totalDays");
  const monthYearCell = document.getElementById("month_year_cell");

  if (startDateInput.value && endDateInput.value) {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
    const timeDifference = Math.abs(endDate - startDate);
    const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    excludesDateCell.textContent = `${startDate.toDateString()} to ${endDate.toDateString()}`;
  } else {
    excludesDateCell.textContent = "";
    totalDaysCell.textContent = "";
  }

  if (startDateInput.value) {
    const selectedYear = startDateInput.value.split("-")[1];
    monthYearCell.textContent = `${selectedYear}`;
  } else {
    monthYearCell.textContent = "";
  }
}

const startInput = document.getElementById("start_date");
const endInput = document.getElementById("end_date");
startInput.addEventListener("change", updateTable);
endInput.addEventListener("change", updateTable);
updateTable();

const savedData = JSON.parse(localStorage.getItem("tableData")) || [];

for (const rowData of savedData) {
  const newRow = document.querySelector("#data-table").insertRow(-1);
  for (let i = 0; i < rowData.length; i++) {
    const cell = newRow.insertCell(i);
    cell.textContent = rowData[i];
  }
}



function buttonHandler (){
  const id = generateRandomID();
  const startDate = document.getElementById("start_date").value;

  const endDate = document.getElementById("end_date").value;
  const monthYear = document.getElementById("month_year_cell").textContent;
  const leadCount = document.getElementById("leadCount").value;
  const expectedDRR = document.getElementById("expectedDRR").value;

  const excludesDate = document.getElementById("date");
  // console.log(id,startDate.value,endDate,monthYear,leadCount);
  //instatiate xhr object
  const xhr = new XMLHttpRequest();
   //open the object 
   xhr.open('POST',"https://https://dummy.restapiexample.com/api/v1/create.com/posts/search?q=love",true);
   xhr.setRequestHeader('Content-Type', 'application/json');


  //  xhr.onload = function (params){
  //   console.log(this.responseText);
  //  }

  let data = {"id":id, "startDate":startDate,"endDate":endDate,"monthYear":monthYear, "leadCount":leadCount, "expectedDRR":expectedDRR,}

   //send the req
   xhr.send(data);
   console.log(data)

}





