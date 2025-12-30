
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = process.env.DATABASE_URL;

const librosSchemaFlexible = new mongoose.Schema({}, { strict: false });

const Libro = mongoose.models.Libros || mongoose.model('Libros', librosSchemaFlexible);

async function exportDatabase() {
    if (!DATABASE_URL) {
        console.error('Error: DATABASE_URL is not defined. Make sure you have a .env file with the correct configuration.');
        process.exit(1);
    }

    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Connected to Database');

        const libros = await Libro.find().lean();
        console.log(`Found ${libros.length} documents to export.`);

        const outputPath = path.join(__dirname, '..', 'corrected_database.json');
        fs.writeFileSync(outputPath, JSON.stringify(libros, null, 2), 'utf-8');
        console.log(`Successfully exported database to ${outputPath}`);

    } catch (error) {
        console.error('Error exporting database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from Database');
    }
}

exportDatabase();
