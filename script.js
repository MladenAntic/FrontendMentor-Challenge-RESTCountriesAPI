const header = document.getElementById("header");
const headerTitle = document.querySelector(".header h2");
const toggleTheme = document.getElementById("themeToggler");
const toggleThemeText = document.querySelector("#themeToggler span");

const searchWrapper = document.querySelector(".main__input");
const searchBtn = document.querySelector(".main__input button");
const input = document.querySelector(".main__input input");

const sortBy = document.querySelector(".main__sortByFilter");
const caretIconSortBy = document.querySelector(".main__sortByFilter i");
const dropdownSortBy = document.querySelector(".main__sortBy ul");
const select = document.querySelector(".main__selectFilter");
const caretIconSelect = document.querySelector(".main__selectFilter i");
const dropdownSelect = document.querySelector(".main__select ul");

const mainContent = document.querySelector(".main__content");

const AZ = document.querySelector(".main__AZ");
const ZA = document.querySelector(".main__ZA");
const populationAscending = document.querySelector(
  ".main__populationAscending"
);
const populationDescending = document.querySelector(
  ".main__populationDescending"
);

const africa = document.querySelector(".main__africa");
const america = document.querySelector(".main__america");
const asia = document.querySelector(".main__asia");
const europe = document.querySelector(".main__europe");
const oceania = document.querySelector(".main__oceania");

const countryInfo = document.querySelector(".mainDetail__countryInfo");
const goBackBtn = document.getElementById("goBack");

if (localStorage.getItem("mode") === "light") {
  document.body.classList.remove("dark-theme");
  header.classList.remove("dark-theme");
  headerTitle.classList.remove("dark-theme");
  toggleTheme.classList.remove("dark-theme");
  toggleThemeText.classList.remove("dark-theme");
  input.classList.remove("dark-theme");
  searchBtn.classList.remove("dark-theme");
  sortBy.classList.remove("dark-theme");
  dropdownSortBy.classList.remove("dark-theme");
  select.classList.remove("dark-theme");
  dropdownSelect.classList.remove("dark-theme");
  goBackBtn.classList.remove("dark-theme");
}

if (localStorage.getItem("mode") === "dark") {
  document.body.classList.add("dark-theme");
  header.classList.add("dark-theme");
  headerTitle.classList.add("dark-theme");
  toggleTheme.classList.add("dark-theme");
  toggleThemeText.classList.add("dark-theme");
  input.classList.add("dark-theme");
  searchBtn.classList.add("dark-theme");
  sortBy.classList.add("dark-theme");
  dropdownSortBy.classList.add("dark-theme");
  select.classList.add("dark-theme");
  dropdownSelect.classList.add("dark-theme");
  goBackBtn.classList.add("dark-theme");
}

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  header.classList.toggle("dark-theme");
  headerTitle.classList.toggle("dark-theme");
  toggleTheme.classList.toggle("dark-theme");
  toggleThemeText.classList.toggle("dark-theme");
  if (toggleThemeText.classList.contains("dark-theme")) {
    toggleThemeText.innerText = "Light Mode";
  } else {
    toggleThemeText.innerText = "Dark Mode";
  }
  input.classList.toggle("dark-theme");
  searchBtn.classList.toggle("dark-theme");
  sortBy.classList.toggle("dark-theme");
  dropdownSortBy.classList.toggle("dark-theme");
  select.classList.toggle("dark-theme");
  dropdownSelect.classList.toggle("dark-theme");
  goBackBtn.classList.toggle("dark-theme");

  let mode;

  if (document.body.classList.contains("dark-theme")) {
    mode = "dark";
  } else {
    mode = "light";
  }

  localStorage.setItem("mode", mode);
});

searchBtn.addEventListener("click", () => {
  searchWrapper.classList.toggle("active");
  input.focus();
});

sortBy.addEventListener("click", () => {
  dropdownSortBy.classList.toggle("show");
  caretIconSortBy.classList.toggle("rotate");
});

select.addEventListener("click", () => {
  dropdownSelect.classList.toggle("show");
  caretIconSelect.classList.toggle("rotate");
});

async function getCountriesAPI() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  return data;
}

getCountriesAPI().then((data) => {
  AZ.addEventListener("click", () => {
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));

    populateData();
  });

  ZA.addEventListener("click", () => {
    data.sort((a, b) => b.name.common.localeCompare(a.name.common));

    populateData();
  });

  populationAscending.addEventListener("click", () => {
    data.sort((a, b) => a.population - b.population);

    populateData();
  });

  populationDescending.addEventListener("click", () => {
    data.sort((a, b) => b.population - a.population);

    populateData();
  });

  function populateData() {
    data.forEach((item) => {
      const country = document.createElement("div");
      country.classList.add("main__country");

      country.innerHTML = `
      <img src="${item.flags.png}" alt="${item.name.common} Flag" />
      <div class="main__countryInfo">
        <h3>${item.name.common}</h3>
        <div>
          <h5>Population:</h5>
          <span class="main__population">${item.population}</span>
        </div>
        <div>
          <h5>Region:</h5>
          <span>${item.region}</span>
        </div>
        <div>
          <h5>Capital:</h5>
          <span>${item.capital}</span>
        </div>
      </div>
    `;

      const countryContent = country.querySelector(".main__countryInfo");

      toggleTheme.addEventListener("click", () => {
        country.classList.toggle("dark-theme");
        countryContent.classList.toggle("dark-theme");
      });

      if (localStorage.getItem("mode") === "light") {
        country.classList.remove("dark-theme");
        countryContent.classList.remove("dark-theme");
      }

      if (localStorage.getItem("mode") === "dark") {
        country.classList.add("dark-theme");
        countryContent.classList.add("dark-theme");
      }

      const population = country.querySelector(".main__population");
      population.innerText = parseFloat(population.innerText).toLocaleString(
        "en"
      );

      mainContent.appendChild(country);

      AZ.addEventListener("click", () => {
        mainContent.removeChild(country);
      });

      ZA.addEventListener("click", () => {
        mainContent.removeChild(country);
      });

      populationAscending.addEventListener("click", () => {
        mainContent.removeChild(country);
      });

      populationDescending.addEventListener("click", () => {
        mainContent.removeChild(country);
      });

      function showCountry() {
        country.style.display = "block";
      }

      function hideCountry() {
        country.style.display = "none";
      }

      input.addEventListener("input", (e) => filterData(e.target.value));

      function filterData(searchTerm) {
        if (item.name.common.toLowerCase().includes(searchTerm.toLowerCase())) {
          showCountry();
        } else {
          hideCountry();
        }
      }

      africa.addEventListener("click", () => {
        if (item.region === "Africa") {
          showCountry();
        } else {
          hideCountry();
        }
      });

      america.addEventListener("click", () => {
        if (item.region === "Americas") {
          showCountry();
        } else {
          hideCountry();
        }
      });

      asia.addEventListener("click", () => {
        if (item.region === "Asia") {
          showCountry();
        } else {
          hideCountry();
        }
      });

      europe.addEventListener("click", () => {
        if (item.region === "Europe") {
          showCountry();
        } else {
          hideCountry();
        }
      });

      oceania.addEventListener("click", () => {
        if (item.region === "Oceania") {
          showCountry();
        } else {
          hideCountry();
        }
      });

      country.addEventListener("click", () => {
        document
          .getElementById("main")
          .replaceWith(document.getElementById("mainDetail"));

        document.getElementById("mainDetail").style.display = "block";

        countryInfo.innerHTML = `
        <div class="mainDetail__countryFlag">
          <img src="${item.flags.png}" alt="${item.name.common} Flag" />
        </div>
        <div class="mainDetail__content">
          <h2>${item.name.common}</h2>
          <div class="mainDetail__info">
            <ul class="mainDetail__info1">
              <li>
                <h5>Native Name:</h5>
                <span>${Object.values(item.name.nativeName)[0].common}</span>
              </li>
              <li>
                <h5>Population:</h5>
                <span class="mainDetail__population">${item.population}</span>
              </li>
              <li>
                <h5>Region:</h5>
                <span>${item.region}</span>
              </li>
              <li>
                <h5>Sub Region:</h5>
                <span>${item.subregion}</span>
              </li>
              <li>
                <h5>Capital:</h5>
                <span>${item.capital}</span>
              </li>
            </ul>
            <ul class="mainDetail__info2">
              <li>
                <h5>Top Level Domain:</h5>
                <span>${item.tld[0]}</span>
              </li>
              <li>
                <h5>Currencies:</h5>
                <span>${Object.values(item.currencies)[0].name}</span>
              </li>
              <li>
                <h5>Languages:</h5>
                <span>${Object.values(item.languages).join(", ")}</span>
              </li>
            </ul>
          </div>
          <div class="mainDetail__borderCountries">
            <h5>Border Countries:</h5>
          </div>
        </div>
        `;

        const countryInfoContent = countryInfo.querySelector(
          ".mainDetail__content"
        );

        if (document.body.classList.contains("dark-theme")) {
          countryInfoContent.classList.add("dark-theme");
        } else {
          countryInfoContent.classList.remove("dark-theme");
        }

        toggleTheme.addEventListener("click", () => {
          countryInfoContent.classList.toggle("dark-theme");
        });

        if (localStorage.getItem("mode") === "light") {
          countryInfoContent.classList.remove("dark-theme");
        }

        if (localStorage.getItem("mode") === "dark") {
          countryInfoContent.classList.add("dark-theme");
        }

        const borderCountriesWrapper = countryInfo.querySelector(
          ".mainDetail__borderCountries"
        );

        const borderCountries = Object.values(item.borders);

        borderCountries.forEach((border) => {
          const spanEl = document.createElement("span");
          spanEl.innerHTML = `${border}`;

          borderCountriesWrapper.appendChild(spanEl);

          if (document.body.classList.contains("dark-theme")) {
            spanEl.classList.add("dark-theme");
          } else {
            spanEl.classList.remove("dark-theme");
          }

          toggleTheme.addEventListener("click", () => {
            spanEl.classList.toggle("dark-theme");
          });

          if (localStorage.getItem("mode") === "light") {
            spanEl.classList.remove("dark-theme");
          }

          if (localStorage.getItem("mode") === "dark") {
            spanEl.classList.add("dark-theme");
          }
        });

        const countryDetailPopulation = countryInfo.querySelector(
          ".mainDetail__population"
        );
        countryDetailPopulation.innerText = parseFloat(
          countryDetailPopulation.innerText
        ).toLocaleString("en");
      });
    });
  }

  populateData();
});
