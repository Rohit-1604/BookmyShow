// localStorage.setItem("timings", JSON.stringify({}));

// Varable Declartions
var hourList = [];
var raidID = [];

var movieDetails = {
  name: null,
  cast: [],
  languages: [],
  genre: [],
  locations: [],
};

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

function addTimings(hour, raid) {
  let theatername = document.getElementById("theater_" + raid);
  if (theatername.value == undefined || theatername.value == "") {
    alert("Please enter theater name before adding timings");
  } else {
    let flag = false;
    let movieDetail = movieDetails || {};
    console.log(JSON.stringify(movieDetail));
    let hours = movieDetails.locations["id_" + raid].timings;

    if (hours.length > 0) {
      for (let i = 0; i < hours.length; i++) {
        var elemntHourNum = hours[i];
        if (elemntHourNum == hour) {
          flag = true;
          alert("Please select a different hour to add to the list");
        }
      }
      if (!flag) {
        hours.push(hour);

        var div = document.createElement("div");
        div.classList.add("btn");
        div.classList.add("btn-outline-success");
        div.classList.add("m-2");
        div.textContent = hour;
        document.getElementById("timings_" + raid).appendChild(div);
        console.log(movieDetails);
      }
    } else {
      hours.push(hour);

      var div = document.createElement("div");
      div.classList.add("btn");
      div.classList.add("btn-outline-success");
      div.classList.add("m-2");
      div.textContent = hour;
      document.getElementById("timings_" + raid).appendChild(div);
      console.log(hourList);
    }
  }
}

// Algorithm for adding a new locations

function addingLocations() {
  var table = document.getElementById("detailsTable");
  let newRow = table.insertRow(-1);
  let newCell1 = newRow.insertCell();
  let newCell2 = newRow.insertCell();
  let newCell3 = newRow.insertCell();
  let newCell4 = newRow.insertCell();
  let rdaid = Math.round(Math.random() * 100);

  raidID.push(rdaid);

  movieDetails.locations["id_" + rdaid] = {
    cityname: null,
    theatername: null,
    ticketprice: null,
    timings: [],
  };
  console.log(JSON.stringify(movieDetails));
  //   console.log(JSON.stringify(raidID));
  newCell1.innerHTML = `<input type="text" class="formfield col-12" id="location_${rdaid}" placeholder="City" onkeyup="upDateData(this.value, 'location' ,${rdaid})">`;
  newCell2.innerHTML = `<input type="text" class="formfield col-12" id="theater_${rdaid}" placeholder="Theater" onkeyup="upDateData(this.value, 'theater' ,${rdaid})">`;
  newCell3.innerHTML = `<input type="text" class="formfield col-12" id="price_${rdaid}" placeholder="Ticket Price"onkeyup="upDateData(this.value, 'price' ,${rdaid})">`;
  newCell4.innerHTML =
    ' <div class="timingholders"><span id="timings_' +
    rdaid +
    '"></span><select name="timer" id="hour' +
    rdaid +
    '" onchange="addTimings(this.value,' +
    rdaid +
    ')" class="hour"></select></div>';

  // var newText1 = document.createTe('<input type="text" class="formfield col-12" id="location" placeholder="Name">');
  // var newText2 = document.createTextNode

  //   newCell1.appendChild(newText1);
  createElementDynamicHour(rdaid);
  newRow.appendChild(newCell1);
  newRow.appendChild(newCell2);
  newRow.appendChild(newCell3);
  newRow.appendChild(newCell4);
}

function createElementDynamicHour(rdaid) {
  for (var i = 0; i < 24; i++) {
    createElementHour2(i + ":00", rdaid);
    createElementHour2(i + ":30", rdaid);
  }

  //   return html;
}

function createElementHour2(hour, id) {
  var elemntHour = document.getElementById("hour" + id);
  var elemntHourOption = document.createElement("option");
  elemntHourOption.text = hour;
  elemntHourOption.value = hour;
  elemntHour.add(elemntHourOption);
}

function upDateData(value, column, raid) {
  if (column == "name") {
    movieDetails.name = value;
  }
  if (column == "cast") {
    let values = value.split(",");
    movieDetails.cast = [];
    for (let i = 0; i < values.length; i++) {
      console.log(values[i]);

      movieDetails.cast.push(values[i]);
    }
  }
  if (column == "language") {
    let values = value.split(",");
    movieDetails.languages = [];
    for (let i = 0; i < values.length; i++) {
      console.log(values[i]);

      movieDetails.languages.push(values[i]);
    }
  }
  if (column == "genre") {
    let values = value.split(",");
    movieDetails.genre = [];
    for (let i = 0; i < values.length; i++) {
      console.log(values[i]);

      movieDetails.genre.push(values[i]);
    }
  }
  if (column == "location") {
    movieDetails.locations["id_" + raid].cityname = value;
  }
  if (column == "theater") {
    // movieDetails.locations[raid].cityname = document.getElementById("location_" + raid).value;
    movieDetails.locations["id_" + raid].theatername = value;
    // movieDetails.locations[raid].ticketprice = document.getElementById("price_" + raid).value;
  }
  if (column == "price") {
    // movieDetails.locations[raid].cityname = document.getElementById("location_" + raid).value;
    // movieDetails.locations[raid].theatername = document.getElementById("theater_" + raid).value;
    movieDetails.locations["id_" + raid].ticketprice = value;
  }
  console.log(
    "Updating database " + value + " column " + column + " with raid id " + raid
  );
  console.log(JSON.stringify(movieDetails));
}
