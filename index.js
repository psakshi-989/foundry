// Get the parallax section element
const parallaxSection = document.querySelector('.parallax section');

// Add the animate class to trigger the animation
parallaxSection.classList.add('animate');

const navLinks = document.querySelectorAll('.nav-links li a');
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetPage = event.target.getAttribute('href');
    loadPage(targetPage);
  });
});

// Function to load a new page
function loadPage(pageUrl) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const pageContent = this.responseText;
      document.body.innerHTML = pageContent;
      addEventListeners();
      setupAnimation();
    }
  };
  xhttp.open('GET', pageUrl, true);
  xhttp.send();
}

function addEventListeners() {
  const navLinks = document.querySelectorAll('.nav-links li a');
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetPage = event.target.getAttribute('href');
      loadPage(targetPage);
    });
  });
}