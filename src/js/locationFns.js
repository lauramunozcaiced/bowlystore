/*Location Functions */

function verifyLSLocation(){
    const locationLocalStorage = JSON.parse(localStorage.getItem('location'));
   if(locationLocalStorage != null){
     locationUser = {...locationLocalStorage};
   }else{
     getDataLocationByGeolocation();
   }
}


function getDataLocationByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const posiblylocationUser = { name: 'User Location', center: { lat: position.coords.latitude, lng: position.coords.longitude } };
            var query = posiblylocationUser.center.lat.toString() + ',' + posiblylocationUser.center.lng.toString();
            getPointGeocoder(query,true);
        });
    }
}

function isInRange(r) {
    if (parseFloat(r.lat) > 3.3442151 && parseFloat(r.lat) < 3.5109796 && parseFloat(r.lng) > -76.558382 && parseFloat(r.lng) < -76.4594922) {
        return true;
    } else {
        return false;
    }
}

function outOrInRangeSettings(isInRange,r) {
    if (isInRange) {
        changeLocationError.innerHTML = '';
        saveLocationMapButton.disabled = false;
        locationUser = {...r};
        updateLocalStorageLocation();
    } else {
        changeLocationError.innerHTML = '';
        changeLocationError.innerHTML = 'No puedes escoger esta ubicación porque está fuera del rango de entregas.';
        saveLocationMapButton.disabled = true;
    }
}

function calculateDelivery(distance){
    return Math.round(distance * 1500 + 2000)
}

function calculateDistance(r1, r2 = locations[1].center) {
    /* The math module contains a function named toRadians which converts from degrees to radians.*/
    lon1 = r1.lng * Math.PI / 180;
    lon2 = r2.lng * Math.PI / 180;
    lat1 = r1.lat * Math.PI / 180;
    lat2 = r2.lat * Math.PI / 180;

    /* Haversine formula */
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;

    return (c * r);
}
