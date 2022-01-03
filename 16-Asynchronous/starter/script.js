'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const preloader = document.querySelector('.preloader');
///////////////////////////////////////
// const gerCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     const html = `
//         <article class="country">
//         <img class="country__img" src="${data.flags.png}" />
//         <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(2)} people</p>
//             <p class="country__row"><span>🗣️</span>${Object.values(
//               data.languages
//             )}</p>
//             <p class="country__row"><span>💰</span>${
//               Object.values(Object.values(data.currencies))[0].name
//             }</p>
//             </div>
//             </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// gerCountryData('usa');
// gerCountryData('portugal');
// gerCountryData('uzbekistan');
// gerCountryData('spain');
// gerCountryData('italy');
// gerCountryData('russia');
// gerCountryData('japan');
// gerCountryData('uae');
/////////////////////////////////////
const renderCountry = (data, classname = '') => {
  const html = `
      <article class="country ${classname}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(2)} people</p>
          <p class="country__row"><span>🗣️</span>${Object.values(
            data.languages
          )}</p>
          <p class="country__row"><span>💰</span>${
            Object.values(Object.values(data.currencies))[0].name
          }</p>
          </div>
          </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// const gerCountryAndNeighbourData = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     // Render country 1
//     console.log(data);
//     renderCountry(data);

//     // Get neighbour country
//     const neighbours = data.borders;
//     console.log(neighbours);
//     if (!neighbours) return;

//     neighbours.forEach(neighbour => {
//       // AJAX call 2
//       const request2 = new XMLHttpRequest();
//       request2.open(
//         'GET',
//         `
//         https://restcountries.com/v3.1/alpha/${neighbour}`
//       );
//       request2.send();

//       request2.addEventListener('load', function () {
//         const [data2] = JSON.parse(this.responseText);
//         renderCountry(data2, 'neighbour');
//       });
//     });
//   });
// };
// gerCountryAndNeighbourData('usa');
// gerCountryAndNeighbourData('portugal');
// gerCountryAndNeighbourData('uzbekistan');
// gerCountryAndNeighbourData('russia');
// gerCountryAndNeighbourData('japan');
// gerCountryAndNeighbourData('uae');

////////////////////
// Fetch
// const gerCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       function (response) {
//         return response.json(); // <- returns response
//       },
//       function () {
//         alert('REJECTED!');
//       }
//     )
//     .then(function ([data]) {
//       console.log(data);
//       renderCountry(data);
//     });
// };
// gerCountryData('uzbekistan');
/////////////////////////
/*

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
const getCountryData = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found'
  ).then(data => {
    renderCountry(data[0]);
    const neighbour = data[0].borders;
    console.log(neighbour);
    //   const neighbour = 'sdsfdsfsd';

    if (!neighbour) throw new Error('No neighbor(s) found');

    // Country 2
    return getJSON(
      `https://restcountries.com/v3.1/alpha/${neighbour}`,
      'Neighbour not found'
    )
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
        console.error(`${err} 💥💥💥`);
        renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  });
};

btn.addEventListener('click', () => {
  getCountryData('italy');
});
*/

/////
//Coding challenge #1
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       response.json();
//     })
//     .then(data => {
//       console.log([data]);
//       //   console.log(`You are in ${[data][0].city}`);
//     });
//   // .catch(error => console.log(error.message))
//   // .finally(err => console.error(err));
// };
// whereAmI(52.588, 13.381);
/*
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(
        `https://restcountries.eu/rest/v2/name/${data.country.toLowerCase()}`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry([data][0]))
    .catch(err => console.error(`${err.message} 💥`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/
// const weather = function () {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=Urgench,&units=metric&appid=937baab680701220667de612cec76331`
//   )
//     .then(response => response.json())
//     .then(data => console.log(data));
// };
// // weather('urgench');
// // weather('rome');
// // weather('moscow');
// // weather('pekin');
// weather();
