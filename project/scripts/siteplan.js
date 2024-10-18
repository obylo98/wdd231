const menuButton = document.getElementById('menu');
const nav = document.querySelector('nav');
const sitePurpose = document.getElementById('site-purpose');

menuButton.addEventListener('click', () => {
  // Toggle the 'show' class for the nav and menu button
  nav.classList.toggle('show');
  menuButton.classList.toggle('show');
  
  // Adjust the margin for the section below the menu
  if (nav.classList.contains('show')) {
    sitePurpose.style.marginTop = `${nav.offsetHeight + 20}px`; // Push down based on nav height
  } else {
    sitePurpose.style.marginTop = '20px'; // Reset to original margin
  }
});
