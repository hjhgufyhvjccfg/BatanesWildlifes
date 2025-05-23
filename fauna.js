const modal = document.getElementById("infoModal");
const closeButton = document.getElementById("closeModal");
const galleryImages = document.querySelectorAll(".gallery-img");

let speciesMap; // To store the Leaflet map instance

// Approximate center of Batanes and a good default zoom for 200px height
const batanesCenter = [20.8, 121.9]; // near Basco, Batanes
const defaultZoom = 10;

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    // Set modal content
    document.getElementById("modalSpeciesImage").src = img.src;
    document.getElementById("speciesName").textContent = img.dataset.name;
    document.getElementById("scientificName").textContent = img.dataset.scientific;
    document.getElementById("description").textContent = img.dataset.description;
    document.getElementById("status").textContent = img.dataset.status;
    document.getElementById("location").textContent = img.dataset.location;

    const lat = parseFloat(img.dataset.lat);
    const lng = parseFloat(img.dataset.lng);

    modal.classList.add("show");

    setTimeout(() => {
      if (speciesMap) {
        speciesMap.remove();
      }

      speciesMap = L.map("speciesMap").setView([lat, lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(speciesMap);

      L.marker([lat, lng]).addTo(speciesMap)
        .bindPopup(`${img.dataset.name} (${img.dataset.scientific})`)
        .openPopup();

      // Fix centering after render
      setTimeout(() => {
        speciesMap.invalidateSize();
        speciesMap.setView([lat, lng], 13);
      }, 100);

    }, 350); // wait for modal to appear first
  });
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("show");

  if (speciesMap) {
    speciesMap.remove();
    speciesMap = null;
  }
});

// Optional: close modal when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    if (speciesMap) {
      speciesMap.remove();
      speciesMap = null;
    }
  }
});

// Hamburger toggle (clean and consistent)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');    // toggle hamburger animation
  navLinks.classList.toggle('show');       // toggle nav visibility
});
