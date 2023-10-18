async function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 14.621323023162475, lng: 121.05367110659587 },
    mapId: "f46a464177ba7400",
  });

  const response = await fetch("./libraries.json");
  const records = await response.json();
  const libraries = records.libraries

  // Create markers.
  for (let i = 0; i < libraries.length; i++) {
    // Create marker
    const marker = new google.maps.Marker({
      position: { lat: libraries[i].lat, lng: libraries[i].long },
      title: libraries[i].name,
      map: map,
    });

    // Set content for infowindow
    const contentString = `
      <div class="infowindow-content">
        <h1>${libraries[i].name}</h1>
        <div>
          <p>Address: ${libraries[i].name}</p>
        </div>
      </div>
    `

    // Create infowindow
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: libraries[i].name,
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  }
}