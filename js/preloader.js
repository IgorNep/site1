const preloader = document.querySelector(".preloader");

setTimeout(() => {
  hidePreloader();
}, 5000);
const hidePreloader = () => {
  preloader.style.display = "none";
};
