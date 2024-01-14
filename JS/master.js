//check if there's local storage color option exist
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    // Remove Active class from all colors list item
    element.classList.remove(".active");
    //add active class on element with data-color === local storage item
    if (element.dataset.color === mainColors) {
      element.classList.add(".active");
    }
  });
}

// option True Or False Random Background
let backgroundOption = true;

// Variable to control the interval
let backgroundInterval;

// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if background local storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // remove active class from all spans
  document.querySelectorAll(".randoms span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".randoms .yes").classList.add("active");
  } else {
    document.querySelector(".randoms .no").classList.add("active");
  }
}

//Toggle spin class on icon
let iconFromHtml = document.querySelector(".settings-box .fa-gear");
iconFromHtml.onclick = function () {
  //toggle Class FA-SPIN
  this.classList.toggle("fa-spin");
  //toggle Class open
  document.querySelector(".settings-box").classList.toggle("open");
};

//switch Colors in website
const colorsLi = document.querySelectorAll(".colors-list li");

// loop on all li
colorsLi.forEach((li) => {
  //click on every li item
  li.addEventListener("click", (e) => {
    //set colors on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set colors in local storage
    localStorage.setItem("color_option", e.target.dataset.color);
    // //Remove Active Class From All chiles
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // //add active class on self
    // e.target.classList.add("active");
  });
});

//switch Random background in website
const randomBackground = document.querySelectorAll(".randoms span");

// loop on all Spans
randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImg();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// select Landing Page Element
let pageLanding = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];

// function to randomize IMGS
function randomizeImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change Background Img URl
      pageLanding.style.backgroundImage =
        "url(imgs/header/" + imgsArray[randomNumber] + ")";
    }, 8000);
  }
}

randomizeImg();

// select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //Skills of set top
  let skillsOfSetTop = ourSkills.offsetTop;

  // Skills Outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  let WindowHeight = this.innerHeight;

  // window Scroll Top
  let windowScrollTop = window.scrollY;
  if (windowScrollTop > skillsOfSetTop + skillsOuterHeight - WindowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create PopUp With Images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // crate overlay element
    let overlay = document.createElement("div");
    // add class to overlay
    overlay.className = "popup-overlay";
    //append overlay to the body
    document.body.appendChild(overlay);
    // create popup
    let popupBox = document.createElement("div");
    // add class on popup box
    popupBox.className = "popup-box";
    // Creating Header
    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      //Create Text for heading
      let imgText = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(imgText);

      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }
    // create The Image
    let popupImage = document.createElement("img");
    //set image src
    popupImage.src = img.src;
    // add image to popup-box
    popupBox.appendChild(popupImage);
    // append the popup box to body
    document.body.appendChild(popupBox);

    //Create The Close Span
    let closeButton = document.createElement("span");

    //Create the close button txt
    let closeButtonTxt = document.createTextNode("X");

    //append button txt to Close Span button
    closeButton.appendChild(closeButtonTxt);

    // add class to closeButton
    closeButton.className = "close-btn";

    //add closeButton to popup box
    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-btn") {
    //remove the current popup
    e.target.parentNode.remove();
    //remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollTo(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollTo(allBullets);
scrollTo(allLinks);

// select bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");
// select Father Of bullets
let navBulletsContainer = document.querySelector(".nav-bullets");
//
let bulletLocalS = localStorage.getItem("bullets_option");
if (bulletLocalS !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalS === "block") {
    navBulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    navBulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      navBulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      navBulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

// reset button
document.querySelector(".reset-options").onclick = function () {
  // Clear
  localStorage.clear();
  // OR
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("background_option");
  // localStorage.removeItem("bullet_option");
  window.location.reload();
};

// Toggle Menu

let buttonToggle = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".links");

buttonToggle.onclick = function (e) {
  //Stop Propagation
  e.stopPropagation();
  // add to toggle icon OR toggle menu class (menu active)
  this.classList.toggle("menu-active");
  // add to toggle icon OR toggle menu class (menu active)
  theLinks.classList.toggle("open");
};

// (my way) by some recourses

// document.onclick = function (e) {
//   if (!buttonToggle.contains(e.target) && !theLinks.contains(e.target)) {
//     buttonToggle.classList.remove("menu-active");
//     theLinks.classList.remove("open");
//   }
// };

// click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
  if (e.target !== buttonToggle && e.target !== theLinks) {
    // check if menu is open
    if (
      theLinks.classList.contains("open") &&
      buttonToggle.classList.contains("menu-active")
    ) {
      buttonToggle.classList.remove("menu-active");
      theLinks.classList.remove("open");
    }
  }
});

// Stop Propagation
theLinks.onclick = (e) => {
  e.stopPropagation();
};
