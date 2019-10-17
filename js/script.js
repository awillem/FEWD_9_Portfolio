// Global Variables
// All of the project cards, visible or not
const projCards = document.querySelectorAll('#projects .card');

const projDiv = document.getElementById('projects');
const arrowLeft = document.getElementsByClassName('left')[0];
const arrowRight = document.getElementsByClassName('right')[0];


// When the user scrolls the page, execute myFunction
window.onscroll = function () { myFunction(); };

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.innerWidth > 768) {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }
}

// If the browser is resized,checks the innerWidth of window
// and adds or removes the "sticky" class to the nav.

window.addEventListener('resize', e => {
  getInnerWidth();
  showProjects();
  setArrowDisable();
});

function getInnerWidth() {
  console.log(window.innerWidth);
  if (window.innerWidth <= 768) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

getInnerWidth();
showProjects();
arrowLeft.classList.add('disabled');



/*
  Project Card Tumbler
*/




// Lists for clicks on the Project Nav buttons
// If the right button is clicked, changes the current last item shown
// to not be visible, and changes the currently invisible item before 
// the first item shown to be visible, and vice versa.
projDiv.addEventListener('click', e => {
  if (e.target.tagName === 'svg' || e.target.tagName === 'path') {
    let currentFirstIndex = -1;
    let currentLastIndex;
    for (let i = 0; i < projCards.length; i++) {
      if (projCards[i].className.match('visible')) {
        if (currentFirstIndex === -1) {
          currentFirstIndex = i;
        }
        currentLastIndex = i;
      }
    }

    if (e.target.classList.value === "left" || e.target.parentNode.classList.value === "left") {
      if (currentFirstIndex > 0) {
        projCards[currentLastIndex].className = "card hidden-right";
        projCards[currentFirstIndex - 1].style.display = "flex";
        setTimeout(() => {
          projCards[currentFirstIndex - 1].className = "card";
          projCards[currentFirstIndex - 1].classList.add('visible');
        }, 100);


      }
    } else if (e.target.classList.value === "right" || e.target.parentNode.classList.value === "right") {
      if (currentLastIndex < projCards.length - 1) {
        projCards[currentFirstIndex].className = "card hidden-left";

        projCards[currentLastIndex + 1].style.display = "flex";
        setTimeout(() => {
          projCards[currentLastIndex + 1].className = "card";
          projCards[currentLastIndex + 1].classList.add('visible');


        }, 100);

      }
    }
  }
  setTimeout(() => {
    setArrowDisable();
  }, 100);

});

function setArrowDisable() {
  console.log(projCards[0].classList.contains('visible'));
  if (projCards[0].classList.contains('visible')) {
    arrowLeft.classList.add('disabled');
  } else {
    arrowLeft.classList.remove('disabled');
  }

  if (projCards[projCards.length - 1].classList.contains('visible')) {
    arrowRight.classList.add('disabled');
  } else {
    arrowRight.classList.remove('disabled');
  }
}


// function to set how many cards are visible based on the screen width;

function displayProjects(qty) {
  for (let i = 0; i < projCards.length; i++) {
    const card = projCards[i];
    card.className = 'card';
    if (i < qty) {
      card.classList.add('visible');
    } else {
      card.classList.add('hidden-right');
    }
  }
}

function showProjects() {
  if (window.innerWidth <= 768) {
    displayProjects(1);
  } else if (window.innerWidth <= 1024) {
    displayProjects(2);
  } else {
    displayProjects(3);
  }
}




