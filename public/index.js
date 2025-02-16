// Get the parallax section element
const parallaxSection = document.querySelector('.parallax section');

// Add the animate class to trigger the animation if the element exists
if (parallaxSection) {
  parallaxSection.classList.add('animate');
}

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

// Get the form and cancel button elements
const form = document.querySelector('.app-form');
const cancelButton = document.getElementById('cancelButton');

// Check if form elements exist
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object to easily access form data
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      contactNo: formData.get('contactNo'),
      message: formData.get('message')
    };
    // Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const contactNoPattern = /^\d{10}$/; // Regex for 10-digit number
    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        alert(`${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty.`);
        return; // Stop form submission
      }
    }
    if (!emailPattern.test(data.email)) {
      alert('Please enter a valid email address.');
      return; // Stop form submission
    }

    if (!contactNoPattern.test(data.contactNo)) {
      alert('Contact number must be a 10-digit number.');
      return; // Stop form submission
    }
    // Send the data to the server using fetch
    fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
      console.log(result); // Handle success response
      // Optionally, you can clear the form here after successful submission
      form.reset(); // Clear the form fields
    })
    .catch(error => {
      console.error('Error:', error); // Handle error response
    });
  });

  // Add event listener for the cancel button
  cancelButton.addEventListener('click', () => {
    form.reset(); // Clear the form fields
  });
}
function setupAnimation() {
  if (window.location.pathname === '/') {
    const parallaxSection = document.querySelector('.parallax section');
    if (parallaxSection) {
      parallaxSection.classList.add('animate');
    }
  }
}
