document.addEventListener('DOMContentLoaded', () => {
    const cars = [
        { id: 1, name: 'Sedán Elegante', brand: 'LuxuryMotors', type: 'sedan', price: 45000, image: 'https://hips.hearstapps.com/hmg-prod/images/2023-genesis-g90-108-1659381777.jpg?crop=0.606xw:0.512xh;0.245xw,0.341xh&resize=700:*', description: 'Perfecto para la ciudad y viajes largos.' },
        { id: 2, name: 'SUV Aventura', brand: 'TrailBlazer', type: 'suv', price: 52000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwbx6f4wVvmtEspy5wobcY-aEH4cI1h40vLQ&s', description: 'Robusto y espacioso para cualquier terreno.' },
        { id: 3, name: 'Cupé Deportivo GT', brand: 'Speedster', type: 'coupe', price: 68000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8vvBdn9PGSSnnmpwpLksmVHVP14k2X1dS8w&s', description: 'Diseño aerodinámico y motor de alto rendimiento.' },
        { id: 4, name: 'Hatchback Urbano', brand: 'CityRide', type: 'hatchback', price: 21000, image: 'https://panaautos.com.pe/wp-content/uploads/2022/05/diagonal-gray-city.png', description: 'Compacto y eficiente, ideal para el día a día.' },
        { id: 5, name: 'Pick-up Resistente', brand: 'WorkHorse', type: 'pickup', price: 39000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoqDSU0RHhmDKajo3dCtunysNLa2jW3ILPAw&s', description: 'Gran capacidad de carga y tracción 4x4.' },
        { id: 6, name: 'Minivan Familiar', brand: 'FamilyVan', type: 'minivan', price: 34000, image: 'https://foton.pe/wp-content/uploads/2025/04/URIS-Slider-VIEW-GRAND-MINIATURA--135x100.jpg', description: 'Confort y espacio para toda la familia.' },
        { id: 7, name: 'Eléctrico Innovador', brand: 'EcoDrive', type: 'sedan', price: 58000, image: 'https://inchcapelatam.sirv.com/JAC/EJS1KWH30/E-JS1-BLANCO.png?w=720', description: 'Cero emisiones y tecnología de vanguardia.' },
        { id: 8, name: 'Jeep Todoterreno', brand: 'RoughRider', type: 'suv', price: 49000, image: 'https://www.jeep.com/content/dam/cross-regional/stellantis/jeep/latam-rol/peru/modelos/2023/wrangler/modelizer-zero/sahara.png.img.2880.png', description: 'Diseñado para conquistar cualquier obstáculo.' },
        { id: 9, name: 'Clásico Vintage', brand: 'OldTimer', type: 'coupe', price: 75000, image: 'https://americancollectors-com.translate.goog/wp-content/uploads/1st-article-photo-1-690x370-1.jpg?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc', description: 'Una joya restaurada con historia.' }
    ];

    const carListings = document.getElementById('carListings');
    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const priceFilter = document.getElementById('priceFilter');
    const applyFiltersButton = document.getElementById('applyFilters');

    function displayCars(filteredCars) {
        carListings.innerHTML = '';
        if (filteredCars.length === 0) {
            carListings.innerHTML = '<p>No se encontraron vehículos que coincidan con su búsqueda.</p>';
            return;
        }

        filteredCars.forEach(car => {
            const carItem = document.createElement('div');
            carItem.classList.add('car-item');
            carItem.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <div class="car-details">
                    <h3>${car.name} (${car.brand})</h3>
                    <p>${car.description}</p>
                    <p>Tipo: ${car.type.charAt(0).toUpperCase() + car.type.slice(1)}</p>
                    <span class="price">$${car.price.toLocaleString()}</span>
                    <button>Ver Detalles</button>
                </div>
            `;
            carListings.appendChild(carItem);
        });
    }

    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;
        const selectedPriceRange = priceFilter.value;

        let filteredCars = cars.filter(car => {
            const matchesSearch = car.name.toLowerCase().includes(searchTerm) || car.brand.toLowerCase().includes(searchTerm);
            const matchesType = selectedType === 'all' || car.type === selectedType;

            let matchesPrice = true;
            if (selectedPriceRange !== 'all') {
                const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
                if (selectedPriceRange.includes('more')) {
                    matchesPrice = car.price >= minPrice;
                } else {
                    matchesPrice = car.price >= minPrice && car.price <= maxPrice;
                }
            }
            return matchesSearch && matchesType && matchesPrice;
        });

        displayCars(filteredCars);
    }

    applyFiltersButton.addEventListener('click', applyFilters);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            applyFilters();
        }
    });

  
    displayCars(cars);
});