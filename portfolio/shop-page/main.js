const mobileMenu = document.querySelector(".mobile-menu");
const burger = document.querySelector(".burger");

burger.addEventListener("click", () => {
    console.log("działa");
    mobileMenu.classList.toggle("show");
})

window.addEventListener("click", () => {
    if (mobileMenu.classList.contains('show')) {
        mobileMenu.classList.toggle("show");
    }
})

const foodPictures = [...document.querySelectorAll(".food")];

let active = 0;
const time = 2500;

const changePicture = () => {
    active++
    if (active === foodPictures.length) {
        active = 0;
    }
    const activePicture = foodPictures.findIndex(picture => picture.classList.contains('active'))
    foodPictures[activePicture].classList.remove('active');
    foodPictures[active].classList.add('active');
}

setInterval(changePicture, time);


const soup = document.querySelector('.soup');
const flat = document.querySelector('.flat');
const steak = document.querySelector('.steak');
const dessert = document.querySelector('.dessert');

const bigPicture = () => {
    const activePicture = foodPictures.findIndex(picture => picture.classList.contains('active'))
    foodPictures[activePicture].classList.remove('active');
    foodPictures[active].classList.add('active')
}

soup.addEventListener("click", () => {
    soup.classList.toggle("click");
});
flat.addEventListener("click", () => {
    flat.classList.toggle("click");
});
steak.addEventListener("click", () => {
    steak.classList.toggle("click");
});
dessert.addEventListener("click", () => {
    dessert.classList.toggle("click");
});