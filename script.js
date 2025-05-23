document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Modal and species content
  const modal = document.getElementById('infoModal');
  const closeModal = document.getElementById('closeModal');
  const galleryItems = document.querySelectorAll('.gallery-item, .gallery-img');

  const modalSpeciesImage = document.getElementById('modalSpeciesImage');
  const speciesName = document.getElementById('speciesName');
  const scientificName = document.getElementById('scientificName');
  const habitat = document.getElementById('habitat');
  const status = document.getElementById('status');
  const description = document.getElementById('description');
  const location = document.getElementById('location');
  const latElem = document.getElementById('lat');
  const lngElem = document.getElementById('lng');

  let speciesMap = null;

  function openModalFromImage(img) {
    const lat = parseFloat(img.dataset.lat);
    const lng = parseFloat(img.dataset.lng);

    modalSpeciesImage.src = img.src;
    speciesName.textContent = img.dataset.name || 'N/A';
    scientificName.textContent = img.dataset.scientific || 'N/A';
    habitat.textContent = img.dataset.habitat || 'N/A';
    status.textContent = img.dataset.status || 'N/A';
    description.textContent = img.dataset.description || 'N/A';
    location.textContent = img.dataset.location || 'N/A';
    latElem.textContent = img.dataset.lat || 'N/A';
    lngElem.textContent = img.dataset.lng || 'N/A';

    modalSpeciesImage.classList.remove('zoomed');
    modal.classList.add('show');

    setTimeout(() => {
      const mapContainer = document.getElementById('speciesMap');
      if (!mapContainer || isNaN(lat) || isNaN(lng)) return;

      // Remove old map if any
      if (speciesMap) {
        speciesMap.remove();
        speciesMap = null;
      }

      // Initialize map
      mapContainer.innerHTML = ''; // Clear previous
      speciesMap = L.map(mapContainer, {
        center: [lat, lng],
        zoom: 13,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(speciesMap);

      L.marker([lat, lng])
        .addTo(speciesMap)
        .bindPopup(`${img.dataset.name} (${img.dataset.scientific})`)
        .openPopup();

      // Fix size issue
      setTimeout(() => {
        speciesMap.invalidateSize();
      }, 300);
    }, 300);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.tagName === 'IMG' ? item : item.querySelector('img');
      if (img) openModalFromImage(img);
    });
  });

  function closeModalFunc() {
    modal.classList.remove('show');
    if (speciesMap) {
      speciesMap.remove();
      speciesMap = null;
    }
  }

  if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFunc();
  });

  if (modalSpeciesImage) {
    modalSpeciesImage.addEventListener('click', () => {
      modalSpeciesImage.classList.toggle('zoomed');
    });
  }
});
