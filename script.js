/* =========================================================
   AKUMA — PREMIUM POLISH SCRIPT
   PHASE 4 / 5 / 6
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const enterScreen = $("#enterScreen");
const enterButton = $("#enterButton");

const mainWebsite = $("#mainWebsite");

const musicButton = $("#musicButton");
const musicLabel = $(".music-label");
const bgMusic = $("#bgMusic");

const memories = $$(".memory");

const messageSection = $("#messageSection");
const messageContent = $("#messageContent");
const closeMessage = $("#closeMessage");
const messageCounter = $("#messageCounter");
const messageProgress = $(".message-progress");

const rainBack = $(".rain-back");
const rainMiddle = $(".rain-middle");
const rainFront = $(".rain-front");

const particles = $("#particles");
const giantTypography = $(".giant-typography");
const ambientLight = $("#ambientLight");


/* =========================================================
   INITIAL STATE
========================================================= */

mainWebsite.classList.add("hidden");

messageSection.style.display = "none";

if (musicLabel) {
    musicLabel.textContent = "PLAY";
}


/* =========================================================
   DATA
========================================================= */

const rainWords = [
    "ASH",
    "RAVEN",
    "AKUMA",
    "NAV"
];


const messages = {

    message1: `
        <h2>
            “Madami akong kaibigan pero isa lang girlfriend ko”
        </h2>

        <p>
            Remember when you told me this?
            It made me realize na, I am so thankful kay God
            to have you. Thank you for always choosing
            to play with me.
        </p>
    `,

    message2: `
        <h2>
            THINGS I LOVE ABOUT YOU
        </h2>

        <p>
            Remember when you woke up and I was crying?
            Yeah, you told me nagising ka bigla and ang timing
            din kasi I was crying. You waited for me to fall
            asleep bago ka makatulog ulit.
            I love you, Kobe.
        </p>
    `,

    message3: `
        <h2>
            THANK YOU
        </h2>

        <p>
            Thank you for always believing in me even if
            I don’t believe in myself, Nav.
        </p>
    `,

    message4: `
        <h2>
            WHEN YOU MISS ME
        </h2>

        <p>
            You are the Kevin to my Bob.
            The Jett to my Sage.
            Ken to my Barbie.
            Thank you kasi lagi mo pinaparamdam na andyan ka,
            nakatingin, nakikinig, at handang tumulong.
            The Nav to my Ash.
        </p>
    `,

    message5: `
        <h2>
            ONE LAST THING
        </h2>

        <p>
            I’m so scared to lose you.
            I’m so scared to be left alone again and one day
            magising ako na wala ka na.
            I cherish you and everything that we built.
        </p>
    `

};


/* =========================================================
   UTILITY
========================================================= */

function random(min, max) {
    return Math.random() * (max - min) + min;
}


function randomInt(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


/* =========================================================
   PHASE 4 — WORD RAIN
========================================================= */

const rainSettings = {

    back: {
        count: 22,
        interval: 650,
        minSize: 8,
        maxSize: 12,
        minDuration: 13,
        maxDuration: 20,
        opacityMin: 0.07,
        opacityMax: 0.16
    },

    middle: {
        count: 25,
        interval: 500,
        minSize: 9,
        maxSize: 15,
        minDuration: 9,
        maxDuration: 16,
        opacityMin: 0.15,
        opacityMax: 0.35
    },

    front: {
        count: 16,
        interval: 760,
        minSize: 11,
        maxSize: 18,
        minDuration: 7,
        maxDuration: 12,
        opacityMin: 0.28,
        opacityMax: 0.58
    }

};


function createRainWord(layer, settings, initial = false) {

    if (!layer) return;

    const word = document.createElement("span");

    word.className = "rain-word";

    word.textContent =
        rainWords[randomInt(0, rainWords.length - 1)];

    const size = random(
        settings.minSize,
        settings.maxSize
    );

    const duration = random(
        settings.minDuration,
        settings.maxDuration
    );

    const opacity = random(
        settings.opacityMin,
        settings.opacityMax
    );

    word.style.left =
        `${random(0, 100)}%`;

    word.style.fontSize =
        `${size}px`;

    word.style.setProperty(
        "--duration",
        `${duration}s`
    );

    word.style.setProperty(
        "--opacity",
        opacity
    );

    word.style.setProperty(
        "--drift",
        `${randomInt(-150, 150)}px`
    );

    word.style.setProperty(
        "--rotation",
        `${randomInt(-8, 8)}deg`
    );

    word.style.setProperty(
        "--scale",
        random(0.8, 1.15)
    );


    if (initial) {

        word.style.animationDelay =
            `-${random(0, duration)}s`;

    } else {

        word.style.animationDelay =
            `${random(0, 1.5)}s`;

    }


    if (Math.random() < 0.08) {

        word.classList.add("special");

        word.style.fontSize =
            `${random(18, 29)}px`;

    }


    layer.appendChild(word);


    setTimeout(() => {

        word.remove();

    }, (duration + 3) * 1000);

}


function initializeRain() {

    const layers = [
        [rainBack, rainSettings.back],
        [rainMiddle, rainSettings.middle],
        [rainFront, rainSettings.front]
    ];

    layers.forEach(([layer, settings]) => {

        for (
            let i = 0;
            i < settings.count;
            i++
        ) {

            createRainWord(
                layer,
                settings,
                true
            );

        }

    });

}


initializeRain();


const rainIntervals = [];


function startRain() {

    if (rainIntervals.length) return;

    const layers = [
        [rainBack, rainSettings.back],
        [rainMiddle, rainSettings.middle],
        [rainFront, rainSettings.front]
    ];

    layers.forEach(([layer, settings]) => {

        const interval =
            setInterval(() => {

                createRainWord(
                    layer,
                    settings
                );

            }, settings.interval);

        rainIntervals.push(interval);

    });

}


function stopRain() {

    rainIntervals.forEach(
        clearInterval
    );

    rainIntervals.length = 0;

}


startRain();


/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

    if (!particles) return;

    particles.innerHTML = "";

    const count =
        window.innerWidth <= 768
            ? 18
            : 35;

    const fragment =
        document.createDocumentFragment();


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "particle";


        particle.style.left =
            `${random(0, 100)}%`;

        particle.style.top =
            `${random(0, 100)}%`;


        particle.style.setProperty(
            "--particle-duration",
            `${random(4, 9)}s`
        );


        particle.style.setProperty(
            "--particle-x",
            `${random(-60, 60)}px`
        );


        particle.style.setProperty(
            "--particle-y",
            `${random(-80, 80)}px`
        );


        particle.style.animationDelay =
            `${random(-8, 0)}s`;


        fragment.appendChild(
            particle
        );

    }


    particles.appendChild(
        fragment
    );

}


createParticles();


/* =========================================================
   ENTER WEBSITE
========================================================= */

enterButton.addEventListener(
    "click",
    async () => {

        if (enterButton.disabled) {
            return;
        }

        enterButton.disabled = true;


        try {

            await bgMusic.play();

        } catch (error) {

            console.log(
                "Music could not autoplay."
            );

        }


        enterScreen.classList.add(
            "exit"
        );


        setTimeout(() => {

            mainWebsite.classList.remove(
                "hidden"
            );

            enterScreen.style.display =
                "none";

        }, 1200);

    }
);


/* =========================================================
   MUSIC
========================================================= */

musicButton.addEventListener(
    "click",
    async () => {

        if (bgMusic.paused) {

            try {

                await bgMusic.play();

            } catch (error) {

                console.error(
                    "Music failed:",
                    error
                );

            }

        } else {

            bgMusic.pause();

        }

    }
);


bgMusic.addEventListener(
    "play",
    () => {

        musicLabel.textContent =
            "PAUSE";

        musicButton.classList.add(
            "playing"
        );

    }
);


bgMusic.addEventListener(
    "pause",
    () => {

        musicLabel.textContent =
            "PLAY";

        musicButton.classList.remove(
            "playing"
        );

    }
);


/* =========================================================
   PHASE 4 — MOUSE ATMOSPHERE
========================================================= */

let mouseX = 50;
let mouseY = 50;

let targetMouseX = 50;
let targetMouseY = 50;

let atmosphereAnimation;


function updateAtmosphere() {

    mouseX +=
        (targetMouseX - mouseX) * 0.08;

    mouseY +=
        (targetMouseY - mouseY) * 0.08;


    if (ambientLight) {

        ambientLight.style.setProperty(
            "--mouse-x",
            `${mouseX}%`
        );

        ambientLight.style.setProperty(
            "--mouse-y",
            `${mouseY}%`
        );

    }


    atmosphereAnimation =
        requestAnimationFrame(
            updateAtmosphere
        );

}


updateAtmosphere();


document.addEventListener(
    "mousemove",
    (event) => {

        if (
            window.innerWidth <= 768
        ) {
            return;
        }


        targetMouseX =
            (event.clientX /
                window.innerWidth) * 100;


        targetMouseY =
            (event.clientY /
                window.innerHeight) * 100;

    }
);


/* =========================================================
   PHASE 4 — HERO PARALLAX
========================================================= */

let parallaxX = 0;
let parallaxY = 0;

let targetParallaxX = 0;
let targetParallaxY = 0;


function updateParallax() {

    parallaxX +=
        (targetParallaxX - parallaxX) *
        0.06;

    parallaxY +=
        (targetParallaxY - parallaxY) *
        0.06;


    if (giantTypography) {

        giantTypography.style.transform =
            `
            translate3d(
                ${parallaxX}px,
                ${parallaxY}px,
                0
            )
            `;

    }


    requestAnimationFrame(
        updateParallax
    );

}


updateParallax();


document.addEventListener(
    "mousemove",
    (event) => {

        if (
            window.innerWidth <= 768
        ) {
            return;
        }


        const x =
            event.clientX /
            window.innerWidth -
            0.5;


        const y =
            event.clientY /
            window.innerHeight -
            0.5;


        targetParallaxX =
            x * 18;

        targetParallaxY =
            y * 14;

    }
);


/* =========================================================
   PHASE 5 — PREMIUM CARD TILT
========================================================= */

function enableCardTilt() {

    memories.forEach(
        (memory) => {

            memory.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.innerWidth <= 768 ||
                        activeMemory
                    ) {
                        return;
                    }


                    const rect =
                        memory.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        ((x - centerX) /
                            centerX) * 5;


                    const rotateX =
                        ((centerY - y) /
                            centerY) * 5;


                    const moveX =
                        ((x - centerX) /
                            centerX) * 3;


                    const moveY =
                        ((y - centerY) /
                            centerY) * 3;


                    memory.style.setProperty(
                        "--card-x",
                        `${(x / rect.width) * 100}%`
                    );

                    memory.style.setProperty(
                        "--card-y",
                        `${(y / rect.height) * 100}%`
                    );


                    memory.style.transform =
                        `
                        translate3d(
                            ${moveX}px,
                            ${-10 + moveY}px,
                            0
                        )
                        scale(1.045)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        `;

                }
            );


            memory.addEventListener(
                "mouseleave",
                () => {

                    memory.style.transform =
                        "";

                }
            );

        }
    );

}


enableCardTilt();


/* =========================================================
   PHASE 5 — CARD RIPPLE
========================================================= */

function createRipple(
    memory,
    event
) {

    const ripple =
        document.createElement("span");

    ripple.className =
        "card-ripple";


    const rect =
        memory.getBoundingClientRect();


    const x =
        event.clientX -
        rect.left;

    const y =
        event.clientY -
        rect.top;


    ripple.style.left =
        `${x}px`;

    ripple.style.top =
        `${y}px`;


    memory.appendChild(
        ripple
    );


    setTimeout(() => {

        ripple.remove();

    }, 900);

}


/* =========================================================
   MESSAGE SYSTEM
========================================================= */

let activeMemory = null;


function openMessage(
    memory,
    event = null
) {

    if (activeMemory) {
        return;
    }


    const messageID =
        memory.dataset.message;


    if (!messages[messageID]) {
        return;
    }


    activeMemory =
        memory;


    if (event) {
        createRipple(
            memory,
            event
        );
    }


    const cardNumber =
        [...memories].indexOf(memory) + 1;


    messageCounter.textContent =
        `${String(cardNumber).padStart(2, "0")} / 05`;


    messageProgress.style.width =
        `${cardNumber * 20}%`;


    messageContent.innerHTML =
        messages[messageID];


    memory.classList.add(
        "message-opening"
    );


    document.body.classList.add(
        "reading-message"
    );


    setTimeout(() => {

        messageSection.style.display =
            "flex";

        messageSection.setAttribute(
            "aria-hidden",
            "false"
        );


        requestAnimationFrame(() => {

            messageSection.classList.add(
                "show"
            );

        });

    }, 500);

}


/* =========================================================
   MEMORY CLICK
========================================================= */

memories.forEach(
    (memory) => {

        memory.addEventListener(
            "click",
            (event) => {

                openMessage(
                    memory,
                    event
                );

            }
        );


        /* PHASE 6 — KEYBOARD */

        memory.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openMessage(
                        memory
                    );

                }

            }
        );

    }
);


/* =========================================================
   CLOSE MESSAGE
========================================================= */

function closeCurrentMessage() {

    if (
        !messageSection.classList.contains(
            "show"
        )
    ) {
        return;
    }


    messageSection.classList.remove(
        "show"
    );


    messageSection.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "reading-message"
    );


    setTimeout(() => {

        messageSection.style.display =
            "none";


        memories.forEach(
            (memory) => {

                memory.classList.remove(
                    "message-opening"
                );

                memory.style.transform =
                    "";

            }
        );


        messageContent.innerHTML =
            "";

        messageProgress.style.width =
            "0";

        activeMemory =
            null;

    }, 800);

}


/* =========================================================
   CLOSE BUTTON
========================================================= */

closeMessage.addEventListener(
    "click",
    closeCurrentMessage
);


/* =========================================================
   BACKDROP CLOSE
========================================================= */

messageSection.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            messageSection
        ) {

            closeCurrentMessage();

        }

    }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeCurrentMessage();

        }

    }
);


/* =========================================================
   PHASE 6 — ARROW KEY NAVIGATION
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (!activeMemory) {
            return;
        }


        const currentIndex =
            [...memories].indexOf(
                activeMemory
            );


        if (
            event.key === "ArrowRight" &&
            currentIndex < memories.length - 1
        ) {

            closeCurrentMessage();

            setTimeout(() => {

                openMessage(
                    memories[currentIndex + 1]
                );

            }, 850);

        }


        if (
            event.key === "ArrowLeft" &&
            currentIndex > 0
        ) {

            closeCurrentMessage();

            setTimeout(() => {

                openMessage(
                    memories[currentIndex - 1]
                );

            }, 850);

        }

    }
);


/* =========================================================
   PHASE 6 — TOUCH FEEDBACK
========================================================= */

memories.forEach(
    (memory) => {

        memory.addEventListener(
            "touchstart",
            () => {

                memory.classList.add(
                    "touching"
                );

            },
            {
                passive: true
            }
        );


        memory.addEventListener(
            "touchend",
            () => {

                setTimeout(() => {

                    memory.classList.remove(
                        "touching"
                    );

                }, 250);

            },
            {
                passive: true
            }
        );

    }
);


/* =========================================================
   VISIBILITY PERFORMANCE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            stopRain();

            if (
                atmosphereAnimation
            ) {

                cancelAnimationFrame(
                    atmosphereAnimation
                );

            }

        } else {

            startRain();

            updateAtmosphere();

        }

    }
);


/* =========================================================
   RESIZE
========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(() => {

                createParticles();

            }, 250);

    }
);


/* =========================================================
   IMAGE ERROR HANDLER
========================================================= */

$$(".memory img").forEach(
    (image) => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image not found:",
                    image.src
                );

            }
        );

    }
);


/* =========================================================
   PHASE 6 — PREVENT ACCIDENTAL PAGE SCROLL
   WHILE READING MESSAGE
========================================================= */

let savedScrollPosition = 0;


const observer =
    new MutationObserver(() => {

        if (
            document.body.classList.contains(
                "reading-message"
            )
        ) {

            if (
                document.body.dataset.locked !==
                "true"
            ) {

                savedScrollPosition =
                    window.scrollY;

                document.body.dataset.locked =
                    "true";

            }

        } else {

            if (
                document.body.dataset.locked ===
                "true"
            ) {

                document.body.dataset.locked =
                    "false";

                window.scrollTo(
                    0,
                    savedScrollPosition
                );

            }

        }

    });


observer.observe(
    document.body,
    {
        attributes: true,
        attributeFilter: ["class"]
    }
);

// Disable right-click
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

// Disable keyboard shortcuts
document.addEventListener("keydown", (e) => {

    // F12
    if (e.key === "F12") {
        e.preventDefault();
        return;
    }

    // Ctrl + U
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        return;
    }

    // Ctrl + Shift + I
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        return;
    }

    // Ctrl + Shift + J
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
        return;
    }

    // Ctrl + Shift + C
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        return;
    }

    // Ctrl + S
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        return;
    }
});

/* =========================================================
   END
========================================================= */