// General Functions 

function celciusToFahr(temperature) {
    let fahr = (9 / 5 * temperature) + 32;
    return fahr;
}

const galleryImages = [
    {
        src: './assets/gallery/image1.jpg',
        alt: 'Thumbnail Image 1'
    },
    {
        src: './assets/gallery/image2.jpg',
        alt: 'Thumbnail Image 2'
    },
    {
        src: './assets/gallery/image3.jpg',
        alt: 'Thumbnail Image 3'
    }

]

const products = [
    {
        title: "Astro Fiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
];

const weatherAPIKey = 'f5108a8493787faa3ec9b157a6543bda';

const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

// Menu Section 

function menuHandler() {
    document.querySelector('#open-nav-menu').addEventListener('click', function () {
        document.querySelector('.wrapper').classList.add('nav-open')
    })

    document.querySelector('#close-nav-menu').addEventListener('click', function () {
        document.querySelector('.wrapper').classList.remove('nav-open')
    })
}

// Greeting Section

function greetingHandler() {
    let currentHour = new Date().getHours();
    let greetingText;

    if (currentHour < 12) {
        greetingText = 'Good Morning!';
    } else if (currentHour < 19) {
        greetingText = 'Good Afternoon';
    } else if (currentHour < 24) {
        greetingText = 'Good Evening!'
    } else {
        greetingText = 'Welcome!'
    }
    document.querySelector('#greeting').innerHTML = greetingText;
}

// Clock Section 

function clockHandler() {
    setInterval(function () {
        let localTime = new Date();
        document.querySelector('span[data-time="hours"]').innerHTML = localTime.getHours().toString().padStart(2, 0);
        document.querySelector('span[data-time="minutes"]').innerHTML = localTime.getMinutes().toString().padStart(2, 0);
        document.querySelector('span[data-time="seconds"]').innerHTML = localTime.getSeconds().toString().padStart(2, 0);

    }, 1000)
}

// Gallery Section 

function galleryHandler() {
    let mainImage = document.querySelector('#gallery > img');
    let thumbnails = document.querySelector('#gallery .thumbnails');
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;

    galleryImages.forEach(function (image, index) {
        let thumb = document.createElement('img')
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;
        thumbnails.appendChild(thumb)
        thumb.addEventListener('click', function (e) {
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = galleryImages[selectedIndex];
            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;
            thumbnails.querySelectorAll('img').forEach(function (e) {
                e.dataset.selected = false;
                if (e.dataset.arrayIndex === selectedIndex) {
                    e.dataset.selected = true;
                }
            })
        })
    })
}

// Products Section 

function populateProducts(productList) {
    let productsSections = document.querySelector('.products-area');
    productsSections.textContent = "";
    productList.forEach(function (product, index) {
        let productElm = document.createElement('div');
        let productDetails = document.createElement('div');
        let productImg = document.createElement('img');
        let productTitle = document.createElement('h3');
        let productAuthor = document.createElement('p');
        let priceTitle = document.createElement('p');
        let productPrice = document.createElement('p');

        productElm.classList.add('product-item');
        productDetails.classList.add('product-details');
        productTitle.classList.add('product-title');
        productAuthor.classList.add('product-author');
        priceTitle.classList.add('price-title');
        productPrice.classList.add('product-price');

        productImg.src = product.image;
        productImg.alt = 'Image for ' + product.title;
        productTitle.textContent = product.title;
        productAuthor.textContent = product.author;
        priceTitle.textContent = 'Price';
        productPrice.textContent = product.price > 0 ? `$${product.price.toFixed(2)}` : 'Free';

        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(priceTitle);
        productDetails.append(productPrice);

        productElm.append(productImg);
        productElm.append(productDetails)
        productsSections.append(productElm)
    })
}

function productHandler() {
    let paidProducts = products.filter(function (paidItems) {
        return paidItems.price > 0;
    })

    let freeProducts = products.filter(function (freeItem) {
        return !freeItem.price || freeItem.price <= 0;
    })

    let productsFilter = document.querySelector('.products-filter');

    productsFilter.addEventListener('click', function (e) {
        if (e.target.id === 'all') {
            populateProducts(products);
        } else if (e.target.id === "paid") {
            populateProducts(paidProducts);
        } else if (e.target.id === "free") {
            populateProducts(freeProducts);
        }
    });
    populateProducts(products);

    document.querySelector('label[for=all] span.product-amount').textContent = products.length;
    document.querySelector('label[for=paid] span.product-amount').textContent = paidProducts.length;
    document.querySelector('label[for=free] span.product-amount').textContent = freeProducts.length;
}

function footerHandler() {
    let currentYear = new Date().getFullYear();
    document.querySelector('footer').textContent = ` ${currentYear} - All rights reserved`
}

function weatherHandler() {
    navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = weatherAPIURL
            .replace('{lat}', latitude)
            .replace('{lon}', longitude)
            .replace('{API key}', weatherAPIKey);
        fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                const location = data.name;
                const condition = data.weather[0].description;
                const temp = data.main.temp;
                let celciusText = `The weather is ${condition} in ${location} and it’s ${temp.toFixed(1)}°C outside.`
                let fahrText = `The weather is ${condition} in ${location} and it’s ${celciusToFahr(temp).toFixed(1)}°F outside.`;
                document.querySelector('p#weather').innerHTML = celciusText;
                document.querySelector('.weather-group').addEventListener('click', function (e) {
                    if (e.target.id == "celsius") {
                        document.querySelector('p#weather').innerHTML = celciusText;
                    } else if (e.target.id == "fahr") {
                        document.querySelector('p#weather').innerHTML = fahrText;
                    }
                })

            }).catch(function (error) {
                document.querySelector('p#weather').innerHTML = 'We are getting having trouble retrieving the information. Please try again.';
            })
    });
}
// Page Load 

menuHandler();
weatherHandler();
greetingHandler();
clockHandler();
galleryHandler();
productHandler();
footerHandler();