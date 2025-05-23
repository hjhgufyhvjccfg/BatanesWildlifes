// Modal and Gallery Elements
const modal = document.getElementById("infoModal");
const closeButton = document.getElementById("closeModal");
const galleryImages = document.querySelectorAll(".gallery-img");

let speciesMap; // To store Leaflet map instance
const batanesCenter = [20.8, 121.9];
const defaultZoom = 10;

// Handle gallery image click → Show modal with content + map
galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    // Set modal image and details
    document.getElementById("modalSpeciesImage").src = img.src;
    document.getElementById("speciesName").textContent = img.dataset.name;
    document.getElementById("scientificName").textContent = img.dataset.scientific;
    document.getElementById("description").textContent = img.dataset.description;
    document.getElementById("status").textContent = img.dataset.status;
    document.getElementById("location").textContent = img.dataset.location;

    const lat = parseFloat(img.dataset.lat);
    const lng = parseFloat(img.dataset.lng);

    modal.classList.add("show");

    // Initialize Leaflet map after modal is shown
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

      // Fix Leaflet sizing bug when inside modal
      setTimeout(() => {
        speciesMap.invalidateSize();
        speciesMap.setView([lat, lng], 13);
      }, 100);
    }, 350);
  });
});

// Close modal on button click
closeButton?.addEventListener("click", () => {
  modal.classList.remove("show");
  if (speciesMap) {
    speciesMap.remove();
    speciesMap = null;
  }
});

// Close modal if user clicks outside modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    if (speciesMap) {
      speciesMap.remove();
      speciesMap = null;
    }
  }
});

// Hamburger menu toggle for mobile navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("show");
});
