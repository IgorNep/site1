const arrows = document.querySelectorAll(".arrow");
const arrowsAlert = document.querySelectorAll(".arrow-alert");
const arrowsReg = document.querySelectorAll(".arrow-reg");
const arrowsPreload = document.querySelectorAll(".arrow-preload");

class AddActive {
  constructor(arr, speed) {
    this.index = 0;
    this.speed = speed;
    this.arr = arr;
    this.switch();
  }
  switch() {
    this.intId = setInterval(() => {
      if (this.index === this.arr.length) {
        this.index = 0;
      }
      this.toggleOff();
      this.arr[this.index].classList.remove("none-active");
      this.index++;
    }, this.speed);
  }
  toggleOff() {
    this.arr.forEach((item) => {
      item.classList.add("none-active");
    });
  }
  stopSwitch() {
    clearInterval(this.intId);
  }
}

const arrow1 = new AddActive(arrows, 200);
const arrow2 = new AddActive(arrowsAlert, 300);
const arrow3 = new AddActive(arrowsReg, 300);
const arrow4 = new AddActive(arrowsPreload, 100);
//button to go up to header
const btnHome = document.getElementById("btn-up");

//define icon and add class active to icon
const icons = document.querySelectorAll(".icon");
const offers = document.querySelectorAll(".offer-list__item");

//listen for scroll page
document.addEventListener("scroll", () => {
  if (window.pageYOffset > 200) {
    btnHome.style.display = "flex";
  } else {
    btnHome.style.display = "none";
  }
  if (window.pageYOffset > 700) {
    icons.forEach((icon) => {
      icon.classList.add("active");
    });
    offers.forEach((offer) => {
      offer.classList.add("active");
    });
  }
});
//define vars for function - scrolling
let scrolled;
let timer;

const scrollToTop = () => {
  if (scrolled > 0) {
    window.scrollTo(0, scrolled);
    scrolled = scrolled - 50; // 100 - скорость прокрутки
    timer = setTimeout(scrollToTop, 20);
  } else {
    clearTimeout(timer);
    window.scrollTo(0, 0);
  }
};
//listen for a click
btnHome.addEventListener("click", (e) => {
  e.preventDefault();
  scrolled = window.pageYOffset;
  scrollToTop();
});

//define signin form
const form = document.getElementById("form");
//form coords
let formCoords = form.getBoundingClientRect().y;
//button signup go to registration form
const btn = document.querySelector("#btn-signup");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  scrolled = window.pageYOffset;
  scrollToForm();
});
//scroll to form
const scrollToForm = () => {
  if (scrolled < formCoords) {
    window.scrollTo(0, scrolled);
    scrolled = scrolled + 50;
    timer = setTimeout(scrollToForm, 20);
  } else {
    clearTimeout(timer);
    window.scrollTo(0, formCoords);
  }
};

//define coord of reg form
console.log(form.getBoundingClientRect().y);

//define form values
const userEmail = document.querySelector("#user-email");
const userPassword = document.querySelector("#user-password");

//add event listener to form on submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([userEmail, userPassword]);
  checkLength(userPassword, 6, 25);
  checkEmail(userEmail);
});

//Check required fields
const checkRequired = (arr) => {
  arr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is Required!`);
    } else {
      showSuccess(input);
    }
  });
};

//Check user password length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};
//Check is valid email
const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim().toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};
//Get field name
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};
//Show input error mesaage
const showError = (input, msg) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = msg;
};
//Show success outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};
