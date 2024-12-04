const express = require('express');
const db = require('../database/db');
const haversineDistance = require('../distanceCAL');

// Create a router
const router = express.Router();

// Add a new school
router.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validate input
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, address, latitude, longitude], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    });
});

// List all schools sorted by proximity to a user's location
router.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    // Validate user location
    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    const sql = 'SELECT * FROM schools';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const userLocation = { lat: parseFloat(latitude), lon: parseFloat(longitude) };
        const schoolsWithDistance = results.map(school => {
            const schoolLocation = { lat: school.latitude, lon: school.longitude };
            const distance = haversineDistance(userLocation, schoolLocation);
            return { ...school, distance };
        });

        // Sort schools by distance
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    });
});

module.exports = router;
