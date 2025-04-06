//DOM elements

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-term");
const msg = document.querySelector(".form-msg");
const list = document.querySelector(".cities");
const locationBtn = document.querySelector("#get-location");

const apikey = '91790e0a627cd8911cf68f0297739019';

form.addEventListener('submit', e =>{
    e.preventDefault()

    msg.textContent = ''
    msg.classList.remove('visible')

    let inputVal = input.value

    //to check if the city matches
    const listItemsArray = Array.from(list.querySelectorAll('.cities li'))

    if (listItemsArray.length>0){
        const filteredArray = listItemsArray.filter(el => {
            let content = ""
            let cityName = el.querySelector('.city__name').textContent.toLowerCase()
            let cityCountry = el.querySelector('.city__country').textContent.toLowerCase()

            //to check for city,country code format-
            if (inputVal.includes(',')){
                if (inputVal.split(',')[1].length>2){
                    inputVal = input.split(',')[0]

                    content = cityName
                } else{
                    content = `${cityName},${cityCountry}`
                }
            } else{
                content = cityName;
            }
            return content == inputVal.toLowerCase()
        })
        if (filteredArray.length > 0) {
            msg.textContent = `You already know the weather for 
            ${filteredArray[0].querySelector(".city__name").textContent} 👇 
            ...Otherwise be more specific by adding the country codecode 😊`;
            msg.classList.add("visible")

            form.reset()
            input.focus()

            return
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apikey}&units=metric`

    fetch(url)
        .then(response => response.json())
        .then(data =>{
            //console.log(data);

            if (data.cod == '404'){
                throw new Error(`${data.cod}, ${data.message}`)
            }
            console.log(data);
            const{main, name, sys, weather} = data
            
            const icon = `img/${weather[0]['icon']}.svg`

            const li = document.createElement('li')

            const markup = `
                    <figure>
                        <img src="${icon}" alt="${weather[0]['description']}">
                    </figure>
                    <div>
                        <h2>
                            ${Math.round(main.temp)}<sup>°C</sup>
                        </h2>
                        <p class="city__conditions">${weather[0]['description'].toUpperCase()}</p>
                        <h3><span class="city__name">${name}</span><span class="city__country">${sys.country}</span></h3>
                    </div>
            `

        li.innerHTML = markup
        list.appendChild(li)
        })
        .catch(() => {
            msg.textContent ='Hello from the developer, Thanks for testing this out it means a lot to me, now then please enter a valid city'
            msg.classList.add('visible')
        })
    msg.textContent = ''
    form.reset()
    input.focus()
})

function getLocationWeather() {
    if (navigator.geolocation) {
        locationBtn.textContent = "Loading...";
        navigator.geolocation.getCurrentPosition(
            // Success callback
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data.cod == '404') {
                            throw new Error(`${data.cod}, ${data.message}`);
                        }
                        
                        const {main, name, sys, weather} = data;
                        const icon = `img/${weather[0]['icon']}.svg`;

                        // Check if location is already displayed
                        const listItemsArray = Array.from(list.querySelectorAll('.cities li'));
                        const filteredArray = listItemsArray.filter(el => {
                            let cityName = el.querySelector('.city__name').textContent;
                            return cityName === name;
                        });

                        if (filteredArray.length > 0) {
                            msg.textContent = `You already know the weather for ${name}`;
                            msg.classList.add("visible");
                            return;
                        }

                        const li = document.createElement('li');
                        const markup = `
                            <figure>
                                <img src="${icon}" alt="${weather[0]['description']}">
                            </figure>
                            <div>
                                <h2>
                                    ${Math.round(main.temp)}<sup>°C</sup>
                                </h2>
                                <p class="city__conditions">${weather[0]['description'].toUpperCase()}</p>
                                <h3>
                                    <span class="city__name">${name}</span>
                                    <span class="city__country">${sys.country}</span>
                                </h3>
                                <p class="city__location">📍 Your Location</p>
                            </div>
                        `;

                        li.innerHTML = markup;
                        list.prepend(li); // Add to the beginning of the list
                    })
                    .catch(() => {
                        msg.textContent = 'Please allow location access or enter a city name manually';
                        msg.classList.add('visible');
                    })
                    .finally(() => {
                        locationBtn.textContent = "Get My Location's Weather";
                    });
            },
            // Error callback
            (error) => {
                msg.textContent = `Location error: ${error.message}`;
                msg.classList.add('visible');
                locationBtn.textContent = "Get My Location's Weather";
            }
        );
    } else {
        msg.textContent = 'Geolocation is not supported by your browser';
        msg.classList.add('visible');
    }
}

// Add event listener for location button
locationBtn.addEventListener('click', getLocationWeather);