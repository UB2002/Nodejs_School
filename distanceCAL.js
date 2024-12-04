function haversineDistance(coord1, coord2) {
    const toRad = angle => (Math.PI / 180) * angle;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lon - coord1.lon);

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
              Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

module.exports = haversineDistance;
