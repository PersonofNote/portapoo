export const onLocationError = (e) => {
    alert(e.message);
}

map.on('locationerror', onLocationError);