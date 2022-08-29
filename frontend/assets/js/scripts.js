// Function Update Table
async function loadTableData() {
  // uri
  let uri = "https://bookmy-show-backend.vercel.app/list";
  await fetch(uri, function (err, response) {
    console.log(JSON.stringify(response));
    if (err) {
      console.log(err);
    }
  })
    .then((response) => response.json())
    .then((data) => {
      let list = data.data;
      console.log(list);
      for (let i = 0; i < list.length; i++) {
        let castTeam = "",
          languages = "",
          genreList = "",
          locationList = "",
          numberofLocations = 0;
        let locationKeys = Object.keys(list[i].show_details);
        let show_details = JSON.stringify(list[i].show_details);
        show_details = show_details.slice(0, show_details.length - 1);
        show_details = show_details.slice(1);
        show_details = show_details.replaceAll("\\", "");
        show_details = show_details.trim();
        let show_details_array = [show_details];
        show_details_array = JSON.parse(show_details_array);
        console.log(show_details);
        console.log(show_details_array.length);
        numberofLocations = Object.keys(show_details_array).length;

        for (let ct = 0; ct < list[i].cast_team.length; ct++) {
          castTeam = `${castTeam}<div class="btn btn-outline-success m-1">${list[i].cast_team[ct]}</div>`;
        }
        for (let lng = 0; lng < list[i].languages.length; lng++) {
          languages = `${languages}<div class="btn btn-outline-primary m-1">${list[i].languages[lng]}</div>`;
        }
        for (let genre = 0; genre < list[i].genre.length; genre++) {
          genreList = `${genreList}<div class="btn btn-outline-primary m-1">${list[i].genre[genre]}</div>`;
        }
        // for (let loc = 0; loc < numberofLocations; loc++,numberofLocations++) {
        //   locationList = `${locationList}<div class="btn btn-outline-primary m-1">${list[i].show_details[loc]}</div>`;
        // }

        console.log(castTeam);
        let item = list[i];
        let table = document.getElementById("datatable");
        let newRow = table.insertRow(-1);
        newRow.insertCell().innerHTML = item.movie_name;
        newRow.insertCell().innerHTML = castTeam;
        newRow.insertCell().innerHTML = languages;
        newRow.insertCell().innerHTML = genreList;
        newRow.insertCell().innerHTML = numberofLocations;
        newRow.insertCell().innerHTML = `<td><a href="view-details.html?movieid=${list[i].id}"><button class="btn btn-primary m-2" id="select">View Details</button></a><a href="edit-movie.html?movieid=${list[i].id}"><button class="btn btn-success m-2" id="select">Edit Details</button>
        </a>
    </td>`;
        table.appendChild(newRow);
      }
    });
}

// To Load Accordion Details
async function locationDetails() {
  var url = new URL(window.location);
  let movieid = url.search.split("?")[1].split("=")[1];
  let uri = `https://bookmy-show-backend.vercel.app/details?movieid=${movieid}`;
  await fetch(uri, function (err, response) {
    console.log(JSON.stringify(response.status));
    if (err) {
      console.log(err);
    }
  })
    .then((response) => response.json())
    .then((data) => {
      let list = data.data[0];
      let show_details = JSON.stringify(list.show_details);
      show_details = show_details.slice(0, show_details.length - 1);
      show_details = show_details.slice(1);
      show_details = show_details.replaceAll("\\", "");
      show_details = show_details.trim();
      let show_details_array = [show_details];
      show_details_array = JSON.parse(show_details_array);
      console.log(show_details);
      console.log(Object.keys(show_details_array).length);
      let list_details = Object.keys(show_details_array);
      let accordion = "";
      for (let i = 0; i < list_details.length; i++) {
        // console.log(show_details_array[list_details[i]]["cityname"]);
        let clock = "";
        for (
          let j = 0;
          j < show_details_array[list_details[i]]["timings"].length;
          j++
        ) {
          clock += `<div class="btn btn-outline-success m-2">
            ${show_details_array[list_details[i]]["timings"][j]}</div>`;
        }
        accordion +=
          `<div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse_${
                  list_details[i]
                }" aria-expanded="false" aria-controls="collapse_${
            list_details[i]
          }">
                ${show_details_array[list_details[i]]["cityname"]}
            </button>
        </h2>
        <div id="collapse_${
          list_details[i]
        }" class="accordion-collapse collapse" aria-labelledby="heading_${
            list_details[i]
          }"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="row">
                    <div class="col-2">
                        <b> ${
                            show_details_array[list_details[i]]["theatername"]
                          } </b>
                        <br>
                        <address>
                            <i>Shipra Mall, Noida</i>
                        </address>
                    </div>
                    <div class="col-2">
                        ₹ ${
                          show_details_array[list_details[i]]["ticketprice"]
                        } /-
                    </div>
                    <div class="col-8">
                       ${clock}
                    </div>
                </div>
            </div>
        </div>
    </div>`;
      }
      document.getElementById("accordionExample").innerHTML += accordion;
    });
}

// Funtion to create new movie object
async function createNewMovie() {
  console.log("Creating new movie...");
  console.log("================================");
  console.log(JSON.stringify(movieDetails.locations));
  //   let uri = `https://bookmy-show-backend.vercel.app/add?name=${movieDetails.name}&cast=${movieDetails.cast}&languages=${movieDetails.languages}&genre=${movieDetails.genre}&locations=${movieDetails.locations}`;
  let uri = `https://bookmy-show-backend.vercel.app/add`;
  console.log("url: " + uri);
  await fetch(
    uri,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: movieDetails.name,
        cast: movieDetails.cast,
        languages: movieDetails.languages,
        genre: movieDetails.genre,
        locations: JSON.stringify(movieDetails.locations),
      }),
    },
    function (err, response) {
      console.log(JSON.stringify(response));
      if (err) {
        console.log(err);
      }
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
