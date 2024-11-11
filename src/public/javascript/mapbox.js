// mapboxgl.accessToken = "pk.eyJ1IjoiZHJlZmR1IiwiYSI6ImNtMzJwN2pqNDFnMHUybXBzdDY4aW1zY2gifQ.3H92wFcI4bc0dmfMot_L4Q";

// navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
//   enableHighAccuracy: true
// });

// function successLocation(position) {
//   setupMap([position.coords.longitude, position.coords.latitude]);
// }

// function errorLocation() {
//   setupMap([-2.24, 53.48]);
// }

// function setupMap(center) {
//   const map = new mapboxgl.Map({
//     container: "map",
//     style: "mapbox://styles/mapbox/streets-v11",
//     center: center,
//     zoom: 12
//   });

//   // Fetch locations from Express server and add markers
//   fetch('http://localhost:4000/db/obtenerSucursales')
//     .then(response => response.json())
//     .then(locations => {
//       locations.forEach(location => {
//         // Create a DOM element for the marker
//         const el = document.createElement('div');
//         el.className = 'marker';

//         // Create the marker
//         // Crear el marcador y el popup
//         const marker = new mapboxgl.Marker(el)
//         .setLngLat(location.coordinates)
//         .setPopup(new mapboxgl.Popup({ offset: 25 })
//           .setHTML(`
//             <div class="location-card">
//               <h2>${location.name}</h2>
//               <p><strong>Estado:</strong> ${location.funcionando ? "En funcionamiento" : "No funcionando"}</p>
//               <p><strong>Cámaras:</strong></p>
//               <ul>
//                 ${location.camaras.map(camara => `
//                   <li>
//                     Cámara ${camara.numero}
//                   </li>
//                   <li>IP: ${camara.ip}</li> 
//                   <li>
//                     Estado: ${camara.estado ? "En línea" : "Fuera de línea"}
//                   </li>
//                   <br>
//                 `).join('')}
//               </ul>
//             </div>
//           `))
//         .addTo(map);

//       });
//     })
//     .catch(error => console.error('Error fetching locations:', error));
// }
