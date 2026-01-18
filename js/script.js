/* js/script.js */
// MITIGATION FOR B-003: Encapsulate all code in an IIFE to prevent global scope pollution
(function() {
    'use strict'; // Enforce stricter parsing and error handling

    const islands = {
        tahiti: { name: 'Tahiti', coords: [-17.6509, -149.4260], zoom: 10 },
        moorea: { name: 'Moorea', coords: [-17.5369, -149.8292], zoom: 11 },
        boraBora: { name: 'Bora Bora', coords: [-16.5004, -151.7415], zoom: 12 },
    };
    const attractions = [
        // Ultrathink: Expanded existing content and added one new attraction per island.
        { id: 1, island: 'tahiti', name: 'Papeete Market', coords: [-17.5388, -149.5693], description: "The vibrant heart of the city, the Marché de Papeete is a bustling, two-story marketplace. Downstairs, find fresh fish, tropical fruits, and local delicacies like 'firi firi' donuts. Upstairs is a treasure trove of Polynesian crafts, from hand-woven hats to exquisite 'tifaifai' quilts." },
        { id: 2, island: 'tahiti', name: 'Fautaua Waterfall', coords: [-17.5786, -149.5256], description: "One of Tahiti's tallest cascades at 135m (443 ft), also known as Cascade de Fachoda. Reaching it requires a moderate hike through the lush Fautaua Valley, passing ancient ruins. A permit from Papeete Town Hall is needed, but the reward is a swim in a stunning natural pool." },
        { id: 3, island: 'tahiti', name: 'Point Venus', coords: [-17.4950, -149.4960], description: "A site of immense historical importance. It's here Captain Cook observed the 1769 transit of Venus. This northernmost point of Tahiti features a unique black sand beach, a picturesque 1868 lighthouse, and monuments commemorating the arrival of explorers and missionaries." },
        { id: 10, island: 'tahiti', name: 'Arahoho Blowhole', coords: [-17.5350, -149.4650], description: "A spectacular natural curiosity where waves crash into coastal lava tubes, forcing a powerful jet of seawater and mist into the air with a thundering sound. Located on the scenic east coast, it's a dramatic display of nature's power, especially during high tide." },
        { id: 4, island: 'moorea', name: 'Belvédère Lookout', coords: [-17.5406, -149.8202], description: "The most famous viewpoint on Moorea, offering a stunning panorama of the twin bays—Cook's Bay and Ōpūnohu Bay—separated by the majestic Mount Rotui. The viewpoint sits in the heart of the island's ancient volcanic crater, surrounded by lush pineapple fields." },
        { id: 5, island: 'moorea', name: 'Magic Mountain', coords: [-17.5117, -149.8660], description: "Accessible via a steep but rewarding hike or a 4WD tour, this peak offers an incredible 360-degree view of Moorea's northwestern coast and its turquoise lagoon. The journey is part of the adventure, culminating in one of the island's most 'Instagrammable' vistas." },
        { id: 6, island: 'moorea', name: 'Lagoonarium', coords: [-17.4878, -149.7618], description: "A protected, natural aquarium located on a small 'motu' (islet). A short boat ride takes you to a snorkeler's paradise where you can safely swim among dozens of blacktip sharks, gentle stingrays, and a dazzling array of colorful reef fish in a vibrant coral garden." },
        { id: 11, island: 'moorea', name: 'Toatea Lookout', coords: [-17.4910, -149.7750], description: "Offering a breathtaking view from a different perspective, this easily accessible lookout gazes over the stunning Sofitel resort's overwater bungalows, across the turquoise lagoon, towards the silhouette of Tahiti in the distance. It is particularly beautiful at sunrise." },
        { id: 7, island: 'boraBora', name: 'Mount Otemanu', coords: [-16.5052, -151.7335], description: "The soul of Bora Bora. This jagged, awe-inspiring remnant of an ancient volcano rises 727m (2,385 ft) over the lagoon. While its crumbly volcanic rock makes the summit inaccessible, its majestic presence can be admired from all angles via boat, 4WD, or helicopter tours." },
        { id: 8, island: 'boraBora', name: 'Matira Beach', coords: [-16.5365, -151.7317], description: "Bora Bora's only public beach and arguably one of the most beautiful in the world. A mile of powdery white sand slopes gently into a shallow, warm, crystal-clear turquoise lagoon. It's the perfect spot for swimming, sunbathing, and watching the spectacular sunset." },
        { id: 9, island: 'boraBora', name: 'Coral Gardens', coords: [-16.5181, -151.7058], description: "A world-renowned snorkeling spot, this is a natural underwater park teeming with life. Drift through warm, shallow waters and marvel at the intricate coral formations and the hundreds of colorful tropical fish that call this vibrant ecosystem home. A must-do on any lagoon tour." },
        { id: 12, island: 'boraBora', name: 'WWII Cannons', coords: [-16.4770, -151.7510], description: "A fascinating relic from a different era. After Pearl Harbor, the US established a supply base in Bora Bora. Today, you can find several massive coastal defense cannons still in their panoramic hillside placements, a stark contrast to the island's peaceful vibe. A 4x4 tour is the best way to see them." },
    ];

    document.addEventListener('DOMContentLoaded', () => {
        // MITIGATION FOR B-002: Wrap main logic in try/catch for robust error handling
        try {
            initializeApplication();
        } catch (error) {
            console.error("CATACLYSMIC FAILURE: Application initialization failed.", error);
            // Optionally display a user-friendly error message on the page
            document.body.innerHTML = '<div style="color: red; text-align: center; padding-top: 20%;">SYSTEM OFFLINE. A critical error occurred.</div>';
        }
    });

    function initializeApplication() {
        const welcomeOverlay = document.getElementById('welcome-overlay');

        // MITIGATION FOR UX-002: Check session storage to show overlay only once
        // FIX: Wrap sessionStorage in try/catch for disabled cookies/storage
        let hasSeenOverlay = false;
        try {
             hasSeenOverlay = sessionStorage.getItem('tahiti_welcome_seen');
        } catch (e) {
             console.warn('SessionStorage not available', e);
        }

        let autoDismissTimer = null;

        const hideOverlay = () => {
            if (autoDismissTimer) clearTimeout(autoDismissTimer);
            welcomeOverlay.classList.add('hidden');
            try {
                sessionStorage.setItem('tahiti_welcome_seen', 'true');
            } catch (e) { /* ignore */ }
            // FIX: Ensure it is truly hidden from accessibility tree and tests after transition
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';

                // PALETTE UX: Restore focus to logical starting point after overlay closes (ACC-004)
                // Focusing the active island button is more useful than the header container
                const activeIsland = document.querySelector('.island-btn[aria-current="true"]');
                if (activeIsland) {
                    activeIsland.focus();
                } else {
                    const header = document.getElementById('header');
                    if (header) header.focus();
                }
            }, 1000); // 1s matches transition duration (0.5s delay + 0.5s fade)
        };

        if (hasSeenOverlay) {
            welcomeOverlay.style.display = 'none'; // Instant hide for returning users
            welcomeOverlay.classList.add('hidden');
        } else {
            // PALETTE UX: Allow early dismissal and reduce default wait
            welcomeOverlay.addEventListener('click', hideOverlay);
            welcomeOverlay.addEventListener('keydown', (e) => { if(e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') hideOverlay(); });
            // Make overlay focusable for keyboard users to dismiss
            welcomeOverlay.setAttribute('tabindex', '0');
            welcomeOverlay.focus();

            autoDismissTimer = setTimeout(hideOverlay, 8000); // Extended to prevent race conditions in tests/usage
        }

        const map = L.map('map', { zoomControl: true, attributionControl: false }).setView(islands.tahiti.coords, islands.tahiti.zoom);
        const tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }).addTo(map);

        tileLayer.on('tileerror', (e) => {
            console.error('Tile load error:', e.error, e.coords);
        });

        // MITIGATION FOR: Map rendering issues due to layout timing
        setTimeout(() => map.invalidateSize(), 200);

        const dock = document.getElementById('attraction-dock');
        const islandSelector = document.getElementById('island-selector');
        const mapAnnouncer = document.getElementById('map-announcer');

        function announceMapUpdate(name) {
            if (mapAnnouncer) mapAnnouncer.textContent = `Map view updated to ${name}.`;
        }

        const markers = {};
        let currentActiveId = null; // MITIGATION FOR B-006: State variable

        // Create Island Selector Buttons
        for (const islandKey in islands) {
            const island = islands[islandKey];
            const button = document.createElement('button');
            button.className = 'island-btn';
            button.textContent = island.name;
            button.dataset.islandKey = islandKey;
            // PALETTE UX: Accessibility improvements
            const isActive = islandKey === 'tahiti';
            if (isActive) button.classList.add('active');
            button.setAttribute('aria-current', isActive ? 'true' : 'false');
            islandSelector.appendChild(button);
        }

        // Create Attraction Cards and Markers
        function renderAttractions(islandKey) {
            // Clear existing
            dock.innerHTML = '';
            Object.values(markers).forEach(marker => marker.remove());
            for (const key in markers) delete markers[key];

            const filteredAttractions = attractions.filter(a => a.island === islandKey);

            filteredAttractions.forEach((attraction, index) => {
                // MITIGATION FOR B-004: Use semantic <button> for attraction cards
                const card = document.createElement('button');
                card.className = 'attraction-card';
                card.dataset.id = attraction.id;

                // MITIGATION FOR VULN-001: Prevent XSS by using textContent
                // ACC-FIX: Use span with block styling instead of h2/p inside button for valid HTML
                const title = document.createElement('span');
                title.className = 'card-title';
                title.textContent = attraction.name;

                const desc = document.createElement('span');
                desc.className = 'card-desc';
                desc.textContent = attraction.description;

                card.appendChild(title);
                card.appendChild(desc);

                // PALETTE UX: Roving Tabindex initialization
                card.setAttribute('tabindex', index === 0 ? '0' : '-1');
                card.setAttribute('aria-current', 'false');
                dock.appendChild(card);

                const customIcon = L.divIcon({ className: 'custom-marker', html: '', iconSize: [16, 16], iconAnchor: [8, 8] });
                // PALETTE UX: Added title for accessibility and styled tooltip for delight
                const marker = L.marker(attraction.coords, { icon: customIcon, title: attraction.name }).addTo(map);
                marker.bindTooltip(attraction.name, { offset: [0, -10], direction: 'top', className: 'custom-tooltip' });
                marker.on('click', () => handleInteraction(attraction.id));
                markers[attraction.id] = marker;
            });
        }

        renderAttractions('tahiti');

        let flightController = null;

        function handleInteraction(id) {
            // MITIGATION FOR B-002: Validate that the attraction exists
            const attraction = attractions.find(a => a.id === id);
            if (!attraction) {
                console.warn(`Interaction failed: No attraction found with ID ${id}.`);
                return;
            }

            // MITIGATION B-007: Prevent user meddling during flight
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();

            // MITIGATION FOR UX-004: Clear previous flight cleanup listener to prevent lockout
            if (flightController) {
                map.off('moveend', flightController);
            }

            // PALETTE UX: Respect reduced motion preference
            const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            flightController = () => {
                map.dragging.enable();
                map.touchZoom.enable();
                map.doubleClickZoom.enable();
                map.scrollWheelZoom.enable();
                flightController = null;
            };

            map.once('moveend', flightController);

            map.flyTo(attraction.coords, 14, { animate: !isReducedMotion, duration: isReducedMotion ? 0 : 1.5 });
            announceMapUpdate(attraction.name);

            updateActiveStates(id);
        }

        function updateActiveStates(activeId) {
            // MITIGATION FOR B-006: Efficient state update, no full traversals
            if (currentActiveId === activeId) return; // No change needed

            // Deactivate previous
            if (currentActiveId) {
                const prevCard = document.querySelector(`.attraction-card[data-id='${currentActiveId}']`);
                if (prevCard) {
                    prevCard.classList.remove('active');
                    prevCard.setAttribute('aria-current', 'false');
                }
                markers[currentActiveId]?._icon?.classList.remove('active');
            }

            // Activate new
            const activeCard = document.querySelector(`.attraction-card[data-id='${activeId}']`);
            if (activeCard) {
                activeCard.classList.add('active');
                activeCard.setAttribute('aria-current', 'true');
                activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
            markers[activeId]?._icon?.classList.add('active');

            currentActiveId = activeId;
        }

        // MITIGATION FOR B-005: Use event delegation for attraction dock
        dock.addEventListener('click', (e) => {
            const card = e.target.closest('.attraction-card');
            if (card) {
                // PALETTE UX: Sync tabindex with mouse interaction
                Array.from(dock.children).forEach(c => c.setAttribute('tabindex', '-1'));
                card.setAttribute('tabindex', '0');

                const id = parseInt(card.dataset.id, 10);
                handleInteraction(id);
            }
        });

        // MITIGATION FOR B-004: Add keyboard navigation for the dock
        // PALETTE UX: Roving Tabindex for efficient navigation per Journal 2024-05-25
        dock.addEventListener('keydown', (e) => {
            const cards = Array.from(dock.querySelectorAll('.attraction-card'));
            const currentIndex = cards.indexOf(document.activeElement);
            let nextIndex = -1;

            if (e.key === 'ArrowRight') {
                nextIndex = currentIndex + 1;
                if (nextIndex >= cards.length) nextIndex = 0; // Wrap to start
            } else if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex - 1;
                if (nextIndex < 0) nextIndex = cards.length - 1; // Wrap to end
            } else if (e.key === 'Home') {
                 nextIndex = 0;
            } else if (e.key === 'End') {
                 nextIndex = cards.length - 1;
            }

            if (nextIndex !== -1) {
                e.preventDefault();
                cards[currentIndex].setAttribute('tabindex', '-1');
                cards[nextIndex].setAttribute('tabindex', '0');
                cards[nextIndex].focus();
            }
        });

        islandSelector.addEventListener('click', (e) => {
            const btn = e.target.closest('.island-btn');
            if (btn) {
                const islandKey = btn.dataset.islandKey;
                const island = islands[islandKey];

                if (island) {
                    // Update active state
                    document.querySelectorAll('.island-btn').forEach(b => {
                        const isActive = b === btn;
                        b.classList.toggle('active', isActive);
                        b.setAttribute('aria-current', isActive ? 'true' : 'false');
                    });

                    // Render attractions for the selected island
                    renderAttractions(islandKey);

                    // PALETTE UX: Respect reduced motion preference
                    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    map.flyTo(island.coords, island.zoom, { duration: isReducedMotion ? 0 : 2 });
                    announceMapUpdate(island.name);

                    // Reset state
                    currentActiveId = null;
                }
            }
        });
    }
})();
