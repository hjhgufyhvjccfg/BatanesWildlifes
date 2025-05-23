// Hamburger Menu Functionality
document.getElementById('hamburger').addEventListener('click', function() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
});

// Modal Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('infoModal');
const closeModal = document.getElementById('closeModal');
const modalSpeciesImage = document.getElementById('modalSpeciesImage');
const speciesName = document.getElementById('speciesName');
const scientificName = document.getElementById('scientificName');
const habitat = document.getElementById('habitat');
const status = document.getElementById('status');
const description = document.getElementById('description');
const location = document.getElementById('location');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = item.querySelector('img').src;
        const name = item.getAttribute('data-name');
        const scientific = item.getAttribute('data-scientific');
        const habitatData = item.getAttribute('data-habitat');
        const statusData = item.getAttribute('data-status');
        const descriptionData = item.getAttribute('data-description');
        const locationData = item.getAttribute('data-location');

        // Set modal content
        modalSpeciesImage.src = imgSrc;
        speciesName.textContent = name;
        scientificName.textContent = scientific;
        habitat.textContent = habitatData;
        status.textContent = statusData;
        description.textContent = descriptionData;
        location.textContent = locationData;

        // Show modal
        modal.style.display = 'flex';
    });
});

// Close modal functionality
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside of modal content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
