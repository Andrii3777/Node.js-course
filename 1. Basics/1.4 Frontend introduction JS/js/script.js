/*======================== Task 1 ==========================*/
const blackSquare1 = document.getElementById("blackSquare1");

function hideWithCSS() {
    blackSquare1.style.display = "none";
}

function hideWithJS() {
    blackSquare1.remove();

    /* let parent = document.getElementById("task1");
    let child = document.getElementById("blackSquare");
    parent.removeChild(child); */
}

function hideWithCSSAndJS() {
    blackSquare1.classList.add("hidden");
}

/*======================== Task 2 ==========================*/
function hide() {
    blackSquare2.classList.toggle("hidden");

    /* if (blackSquare2.classList.contains("hidden")) {
        blackSquare2.classList.remove("hidden");
    } else {
        blackSquare2.classList.add("hidden");
    } */
}

/*======================== Task 3 ==========================*/
function hide5() {
    let squares = document.getElementsByClassName("black__square3");

    for (let i = 0; i < squares.length; i++) {
        squares[i].classList.toggle("hidden");
    }
}

/*======================== Task 4 ==========================*/
function toggleElements() {
    let selector = document.getElementById("selectorInput").value;
    let elements = document.querySelectorAll(selector);

    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle("hidden");
    }
}

/*======================== Task 5 ==========================*/
(function task5() {
    let yellowSquare = document.getElementById("yellowSquare");

    yellowSquare.addEventListener("click", firstClick);

    function firstClick() {
        alert('Привет');
        yellowSquare.addEventListener('click', () => yellowSquare.remove());
        yellowSquare.removeEventListener('click', firstClick);
    }
})();

/*======================== Task 6 ==========================*/
(function task6() {
    let redSquare = document.getElementById("redSquare");
    let button = document.getElementById("redSquareButton");

    button.addEventListener("mouseover", () => redSquare.style.display = "block");
    button.addEventListener("mouseout", () => redSquare.style.display = "none");
})();

/*======================== Task 7 ==========================*/
(function task7() {
    let greenRectangle = document.getElementById("greenRectangle");
    let input = document.getElementById("task7Input");

    input.addEventListener("focus", () => greenRectangle.style.display = "block");
    input.addEventListener("input", () => greenRectangle.style.display = "none");
})();

/*======================== Task 8 ==========================*/
function showImage() {
    let imgLink = document.getElementById("imgLinkInput").value;

    let img = new Image();
    img.src = imgLink;

    img.onload = function () {
        imageContainer.innerHTML = "";
        imageContainer.appendChild(img);
    }
};

/*======================== Task 9 ==========================*/
function showImages() {
    let imgLinks = document.getElementById("imgLinksArea").value.split('\n');
    imagesContainer.innerHTML = '';

    for (let i = 0; i < imgLinks.length; i++) {
        let img = new Image();
        img.src = imgLinks[i];
        img.onload = function () {
            imagesContainer.appendChild(img);
        }
    }
};

/*======================== Task 10 ==========================*/
(function showCoordinates() {
    let x = document.getElementById("x");
    let y = document.getElementById("y");

    function streamCoordinates(mouse) {
        x.innerHTML = mouse.clientX;
        y.innerHTML = mouse.clientY;
    }

    document.addEventListener('mousemove', streamCoordinates);
})();

/*======================== Task 11 ==========================*/
(function showLanguage() {
    document.getElementById("language").innerHTML = navigator.language;
})();

/*======================== Task 12 ==========================*/
(function showLocation() {
    navigator.geolocation.getCurrentPosition(function (location) {
        document.getElementById("locationLatitude").innerHTML = location.coords.latitude;
        document.getElementById("locationLongitude").innerHTML = location.coords.longitude;
    });
})();

/*======================== Task 13 ==========================*/
(function task13() {
    // Local Storage
    let localStrg = document.getElementById('localStorage');

    localStrg.addEventListener('input', () => {
        localStorage.setItem('localStorageText', localStrg.innerHTML);
    });

    localStrg.innerHTML = localStorage.getItem('localStorageText');

    // Cookies
    const cookies = document.getElementById('cookies');

    cookies.addEventListener('input', () => {
        setCookie('cookiesText', cookies.innerHTML);
    });

    cookies.innerHTML = getCookie('cookiesText');

    // Returns cookies with the specified name,
    // or undefined if nothing is found
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));

        // Use built-in decodeURIComponent for decoding
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // Sets a cookie
    function setCookie(name, value, options = {}) {
        options = {
            path: '/',
            // you can add other default values if necessary
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    // Session Storage
    let sessionStrg = document.getElementById('sessionStorage');

    sessionStrg.addEventListener('input', () => {
        sessionStorage.setItem('sessionStorageText', sessionStrg.innerHTML);
    });

    sessionStrg.innerHTML = sessionStorage.getItem('sessionStorageText');
})();

/*======================== Task 14 ==========================*/
window.addEventListener('scroll', function () {
    let bottomBtn = document.getElementById("bottomBtn");

    /* window.scrollY >= (document.documentElement.scrollHeight - window.innerHeight - 1)
    if you want to check if the page is right at the bottom  */
    if (window.scrollY) {
        bottomBtn.style.display = "block";
    } else {
        bottomBtn.style.display = "none";
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

/*======================== Task 15 ==========================*/
(function task15() {
    let outerBlock = document.getElementById("outerBlock");

    outerBlock.onclick = (event) => alert(event.target.id + "!");
})();

/*======================== Task 16 ==========================*/
function showBigSquare() {
    let bigSquare = document.getElementById("bigSquare");
    
    bigSquare.style.display = "flex";
    document.body.style.overflow = 'hidden';

    bigSquare.addEventListener("click", function() {
        bigSquare.style.display = "none";
        document.body.style.overflow = "";
    });    
}

