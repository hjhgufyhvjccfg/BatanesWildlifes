document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Toggle card expand/collapse on heading click
  cards.forEach(card => {
    const header = card.querySelector('h2');
    const icon = header.querySelector('.toggle-icon');

    header.style.cursor = 'pointer';

    header.addEventListener('click', () => {
      const isActive = card.classList.toggle('active');
      icon.textContent = isActive ? '▼' : '▶';
    });
  });

  // Toggle navigation visibility on hamburger click (mobile view)
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');

    // Optional: Animate hamburger icon (e.g., toggle active class)
    hamburger.classList.toggle('active');
  });

  // Close nav menu when a link is clicked (optional UX for mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
      }
    });
  });
});
