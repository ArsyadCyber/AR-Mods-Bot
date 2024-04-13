import fs from 'fs';

// Baca file JSON
try {
  const data = fs.readFileSync('../package.json', 'utf8');
  const jsonData = JSON.parse(data);
  console.log(jsonData);
} catch (err) {
  console.error('Error membaca file:', err);
}