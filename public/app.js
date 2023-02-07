const but = document.querySelector(".changer");
const legend = document.querySelector(".legendaOff");
const close = document.querySelector(".closeButton");
const main = document.querySelector("main");

but.addEventListener("click", () =>
{
    legend.classList.add("legendaOn");
    main.classList.add("mainv2");
})

close.addEventListener("click", () =>
{
    legend.classList.remove("legendaOn");
    main.classList.remove("mainv2");
})