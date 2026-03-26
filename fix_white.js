import fs from 'fs';

// 1. Fix CSS White Contrast
let css = fs.readFileSync('src/style.css', 'utf-8');

// Restore the definition of true white, and separate the card background into a new variable
css = css.replace('--color-white: #1E1E1E;', '--color-white: #FFFFFF;\n  --color-card: #1E1E1E;');

// Change the old background declarations to use the new card color instead of white
css = css.replace(/background: var\(--color-white\);/g, 'background: var(--color-card);');

fs.writeFileSync('src/style.css', css);


// 2. Restore HTML span tags that the user deleted
let html = fs.readFileSync('index.html', 'utf-8');

const overlays = [
  'Color Grading',
  'Skin Retouching',
  'Cinematic Look',
  'Editorial Finish',
  'Classic Tones',
  'Object Removal'
];
let i = 0;
// Find empty span tags in the gallery overlay and replace them sequentially with the original text
html = html.replace(/<span><\/span>/g, () => `<span>${overlays[i++]}</span>`);

fs.writeFileSync('index.html', html);

console.log('Restored overlay text and fixed CSS color contrast successfully.');
