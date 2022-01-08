'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const images = document.querySelector('.images');
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
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
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
/*
console.log('Test');
setTimeout(() => {
  console.log('0 sec timer');
}, 0);

Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end!');

const lottery = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You WIN!');
    } else {
      reject(new Error('You LOST!'));
    }
  }, 2000);
});

lottery.then(res => console.log(res)).catch(err => console.error(err));
// Promisifying settimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
wait(2)
.then(() => {
  console.log('Waited 2 seconds');
  return wait(2);
})
.then(() => console.log('Waited 1 seconds'));

const position = navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err)
  );
  
  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      // navigator.geolocation.getCurrentPosition(
        //   position => resolve(position),
        //   err => reject(err)
        // );
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };
    getPosition().then(res => console.log(res));
    
    const whereAmI = function () {
      getPosition()
      .then(position => {
        const { latitude: lat, longitude: lng } = position.coords;
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      })
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
    .then(data => renderCountry([data]))
    .catch(err => console.error(`${err.message} 💥`));
  };
  btn.addEventListener('click', whereAmI);
  
  
  //Coding challenge #2
  const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = `${imgPath}`;
    img.addEventListener('load', () => {
      images.append(img);
      resolve(img);
    });
    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};
let currentImg;
createImage('./img/img-1.jpg')
.then(img => {
  currentImg = img;
  console.log('Image 1 loaded');
  return wait(2);
})
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('./img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .catch(error => console.error(error));
  
  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  const whereAmI = async function (country) {
    try {
      // Geolocation
    const postion = await getPosition();
    const { latitude: lat, longitude: lng } = postion.coords;
    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const dataGeo = await resGeo.json();
    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    const data = await res.json();
    renderCountry(data[0]);
    return `You are in  ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
  }
};
console.log(1);
console.log(2);
console.log(3);
console.log(4);
// whereAmI().then(city => console.log(city));

(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (error) {
    console.log(error.message);
  }
  console.log('Finish');
})();
const getCountry = async function (c1, c2, c3) {
  try {
    const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    
    Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data1.capital, data2.capital, data3.capital);
  } catch (error) {
    console.log(error.message);
  }
};
getCountry('uzbekistan', 'portugal', 'russia');

*/

// Promise.race
// (async function () {
//   const [res] = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/russia`),
//     getJSON(`https://restcountries.com/v3.1/name/uzbekistan`),
//   ]);
//   console.log(res);
// })();

// Promise.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err.message));

//Coding challenge #2
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = `${imgPath}`;
    img.addEventListener('load', () => {
      images.append(img);
      resolve(img);
    });
    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

// let currentImg;
// createImage('./img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('./img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .catch(error => console.error(error));

const loadNPause = async function () {
  try {
    let img = await createImage('./img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('./img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (error) {
    console.log(error.message);
  }
};
// loadNPause();

const imgArr = ['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg'];
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    console.log(error.message);
  }
};
loadAll(imgArr);
