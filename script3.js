document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // DROPDOWN LOGIC
    // =========================
    const accBtn = document.getElementById('account-btn'),
        helpBtnEl = document.getElementById('help-btn'),
        accMenu = document.getElementById('account-menu'),
        helpMenuEl = document.getElementById('help-menu');

    function openMenu(menu, btn) {
        accMenu.classList.remove('show');
        helpMenuEl.classList.remove('show');
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('open'));
        menu.classList.toggle('show');
        btn.classList.toggle('open');
    }

    accBtn?.addEventListener('click', e => {
        e.stopPropagation();
        openMenu(accMenu, accBtn);
    });

    helpBtnEl?.addEventListener('click', e => {
        e.stopPropagation();
        openMenu(helpMenuEl, helpBtnEl);
    });

    document.addEventListener('click', () => {
        accMenu?.classList.remove('show');
        helpMenuEl?.classList.remove('show');
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('open'));
    });


    // =========================
    // LIVE CHAT
    // =========================
    const chatBubbleEl = document.getElementById('live-chat-bubble'),
        chatModalEl = document.getElementById('chat-modal'),
        closeChat = document.getElementById('chat-close'),
        sendBtn = document.getElementById('chat-send'),
        msgInput = document.getElementById('chat-message'),
        chatBodyEl = document.getElementById('chat-body');

    chatBubbleEl?.addEventListener('click', e => {
        e.preventDefault();
        chatModalEl.style.display = 'flex';
        msgInput.focus();
    });

    closeChat?.addEventListener('click', () => {
        chatModalEl.style.display = 'none';
    });

    sendBtn?.addEventListener('click', () => {
        let m = msgInput.value.trim();
        if (!m) return;

        let p = document.createElement('p');
        p.textContent = m;
        p.classList.add('user-msg');
        chatBodyEl.appendChild(p);
        msgInput.value = '';
        chatBodyEl.scrollTop = chatBodyEl.scrollHeight;

        setTimeout(() => {
            let bp = document.createElement('p');
            bp.textContent = "Received: " + m;
            bp.classList.add('bot-msg');
            chatBodyEl.appendChild(bp);
            chatBodyEl.scrollTop = chatBodyEl.scrollHeight;
        }, 500);
    });

    msgInput?.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            sendBtn.click();
            e.preventDefault();
        }
    });

    document.getElementById('help-live-chat')?.addEventListener('click', e => {
        e.preventDefault();
        chatModalEl.style.display = 'flex';
        msgInput.focus();
    });


    // =========================
    // HERO CAROUSEL
    // =========================
    const heroTrack = document.querySelector('.carousel-track');
    const heroDots = document.querySelectorAll('.dot');
    const heroSlides = heroTrack ? Array.from(heroTrack.children) : [];
    let heroIndex = 0;

    function updateHeroCarousel() {
        if (!heroSlides.length) return;
        const slideWidth = heroSlides[0].getBoundingClientRect().width;
        heroTrack.style.transform = `translateX(-${heroIndex * slideWidth}px)`;
        heroDots.forEach(d => d.classList.remove('active'));
        heroDots[heroIndex]?.classList.add('active');
    }

    heroDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            heroIndex = i;
            updateHeroCarousel();
        });
    });

    const heroCarousel = document.querySelector('.hero-carousel');
    let startX = 0, endX = 0;

    heroCarousel?.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    heroCarousel?.addEventListener('touchmove', e => endX = e.touches[0].clientX);
    heroCarousel?.addEventListener('touchend', () => {
        if (startX - endX > 50)
            heroIndex = Math.min(heroIndex + 1, heroSlides.length - 1);
        if (endX - startX > 50)
            heroIndex = Math.max(heroIndex - 1, 0);
        updateHeroCarousel();
    });

    if (heroSlides.length) {
        setInterval(() => {
            heroIndex = (heroIndex + 1) % heroSlides.length;
            updateHeroCarousel();
        }, 3000);

        window.addEventListener('resize', updateHeroCarousel);
        updateHeroCarousel();
    }


    // =========================
    // PROMO SLIDER
    // =========================
    const promoWrapper = document.querySelector(".promo-wrapper");
    const promoTrack = document.querySelector(".promo-track");
    const promoCards = document.querySelectorAll(".promo-card");
    const promoLeft = document.querySelector(".promo-arrow.left");
    const promoRight = document.querySelector(".promo-arrow.right");

    let promoIndex = 0;

    function getPromoCardWidth() {
        return promoCards[0]?.offsetWidth + 12 || 0;
    }

    function getPromoVisibleCards() {
        return Math.floor(promoWrapper.offsetWidth / getPromoCardWidth());
    }

    function getPromoMaxIndex() {
        return promoCards.length - getPromoVisibleCards();
    }

    function updatePromoSlider() {
        const translate = -promoIndex * getPromoCardWidth();
        promoTrack.style.transform = `translateX(${translate}px)`;
    }

    promoRight?.addEventListener("click", () => {
        promoIndex = promoIndex >= getPromoMaxIndex() ? 0 : promoIndex + 1;
        updatePromoSlider();
    });

    promoLeft?.addEventListener("click", () => {
        promoIndex = promoIndex <= 0 ? getPromoMaxIndex() : promoIndex - 1;
        updatePromoSlider();
    });

    if (promoWrapper && promoRight) {
        let auto = setInterval(() => promoRight.click(), 3500);

        promoWrapper.addEventListener("mouseenter", () => clearInterval(auto));
        promoWrapper.addEventListener("mouseleave", () => {
            auto = setInterval(() => promoRight.click(), 3500);
        });
    }


    // =========================
    // COUNTDOWN
    // =========================
    function startCountdown(duration) {
        let time = duration;
        setInterval(() => {
            const h = Math.floor(time / 3600);
            const m = Math.floor((time % 3600) / 60);
            const s = time % 60;

            const countdownEl = document.getElementById("countdown");
            if (countdownEl) {
                countdownEl.textContent =
                    `Time Left: ${h}h : ${m}m : ${s}s`;
            }

            time--;
            if (time < 0) time = duration;
        }, 1000);
    }

    startCountdown(3600);


    // =========================
    // PRODUCT SLIDER (FIXED ARROWS)
    // =========================
    const productSlider = document.getElementById('productSlider');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (productSlider && nextBtn && prevBtn) {

        productSlider.innerHTML += productSlider.innerHTML;

        function updateProductArrows() {
            if (productSlider.scrollLeft <= 5) {
                prevBtn.classList.add('hidden');
            } else {
                prevBtn.classList.remove('hidden');
            }
        }

        nextBtn.addEventListener('click', () => {
            productSlider.scrollBy({
                left: productSlider.clientWidth - 100,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            productSlider.scrollBy({
                left: -(productSlider.clientWidth - 100),
                behavior: 'smooth'
            });
        });

        productSlider.addEventListener('scroll', () => {
            updateProductArrows();

            if (productSlider.scrollLeft >= productSlider.scrollWidth / 2) {
                productSlider.scrollLeft = 0;
            }
        });

        // Drag support
        let isDown = false;
        let startXPos;
        let scrollLeftPos;

        productSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startXPos = e.pageX - productSlider.offsetLeft;
            scrollLeftPos = productSlider.scrollLeft;
        });

        productSlider.addEventListener('mouseleave', () => isDown = false);
        productSlider.addEventListener('mouseup', () => isDown = false);

        productSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - productSlider.offsetLeft;
            const walk = (x - startXPos) * 2;
            productSlider.scrollLeft = scrollLeftPos - walk;
        });
    }

});



















// Newsletter form example submit handling (just prevents default and alerts)
document.getElementById('subscribe-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    const checkbox = document.getElementById('legal-checkbox').checked;
    if (!checkbox) {
        alert('Please accept the legal terms to subscribe.');
        return;
    }
    alert('Subscribed with ' + email);
    this.reset();
});
















const slider = document.getElementById("slider")

function scrollLeft() {
    slider.scrollBy({ left: -500, behavior: "smooth" })
}

function scrollRight() {
    slider.scrollBy({ left: 500, behavior: "smooth" })
}

/* AUTO SCROLL */

let autoScroll = setInterval(() => {
    slider.scrollBy({ left: 200, behavior: "smooth" })
}, 4000)

/* STOP AUTOSCROLL ON HOVER */

slider.addEventListener("mouseenter", () => clearInterval(autoScroll))

/* DRAG / TOUCH SWIPE */

let isDown = false
let startX
let scrollLeftPos

slider.addEventListener("mousedown", (e) => {
    isDown = true
    startX = e.pageX - slider.offsetLeft
    scrollLeftPos = slider.scrollLeft
})

slider.addEventListener("mouseleave", () => isDown = false)

slider.addEventListener("mouseup", () => isDown = false)

slider.addEventListener("mousemove", (e) => {

    if (!isDown) return

    e.preventDefault()

    const x = e.pageX - slider.offsetLeft
    const walk = (x - startX) * 2

    slider.scrollLeft = scrollLeftPos - walk

})










// SPONSORED PRODUCTS SLIDER
const sponsoredSlider = document.getElementById("sponsoredSlider");

function sponsoredScrollRight() {
    sponsoredSlider.scrollBy({ left: 200, behavior: 'smooth' });
}
function sponsoredScrollLeft() {
    sponsoredSlider.scrollBy({ left: -200, behavior: 'smooth' });
}

// Infinite loop effect
sponsoredSlider.addEventListener("scroll", () => {
    if (sponsoredSlider.scrollLeft + sponsoredSlider.clientWidth >=
        sponsoredSlider.scrollWidth - 5) {
        sponsoredSlider.scrollLeft = 0;
    }
});









function scrollRow(rowId, direction) {
    const slider = document.getElementById(rowId);
    if (!slider) return;

    const scrollAmount = 170; // width of product + gap approx
    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
    });
}