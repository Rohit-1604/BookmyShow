// localStorage.setItem("timings", JSON.stringify({}));

// Varable Declartions
var hourList = [];
var locations = [];

// Algorithm for creating and adding times
for (var i = 0; i < 24; i++) {
  createElementHour(i + ":00");
  createElementHour(i + ":30");
}

function createElementHour(hour) {
  var elemntHour = document.getElementById("hour");
  var elemntHourOption = document.createElement("option");
  elemntHourOption.text = hour;
  elemntHourOption.value = hour;
  elemntHour.add(elemntHourOption);
}

function addTimings(hour) {
  let flag = false;
  if (hourList.length > 0) {
    for (let i = 0; i < hourList.length; i++) {
      var elemntHourNum = hourList[i];
      if (elemntHourNum == hour) {
        flag = true;
        alert("Please select a different hour to add to the list");
      }
    }
    if (!flag) {
      hourList.push(hour);

      var div = document.createElement("div");
      div.classList.add("btn");
      div.classList.add("btn-outline-success");
      div.classList.add("m-2");
      div.textContent = hour;
      document.getElementById("timings").appendChild(div);
      console.log(hourList);
    }
  }else{
    hourList.push(hour);

    var div = document.createElement("div");
    div.classList.add("btn");
    div.classList.add("btn-outline-success");
    div.classList.add("m-2");
    div.textContent = hour;
    document.getElementById("timings").appendChild(div);
    console.log(hourList);
  }
}

// Algorithm for adding a new locations

function addingLocations(){
    
}
