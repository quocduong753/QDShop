const mainImg = document.getElementById("main-img");
const smalling = document.querySelectorAll(".small-img");

smalling.forEach((item) => {
    item.onclick = () => (mainImg.src = item.src);
});
