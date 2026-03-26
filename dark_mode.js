import fs from 'fs';

let css = fs.readFileSync('src/style.css', 'utf-8');

// Replace Root Colors
css = css.replace(/--color-bg: #FAFAF9;/g, '--color-bg: #121212;');
css = css.replace(/--color-text: #1C1917;/g, '--color-text: #E0E0E0;');
css = css.replace(/--color-primary: #A39171;/g, '--color-primary: #D4AF37;');
css = css.replace(/--color-primary-dark: #8c7b5d;/g, '--color-primary-dark: #B5952F;');
css = css.replace(/--color-secondary: #E7E5E4;/g, '--color-secondary: #1A1A1A;');
css = css.replace(/--color-white: #FFFFFF;/g, '--color-white: #1E1E1E;');
css = css.replace(/--color-dark: #0A0A0A;/g, '--color-dark: #FFFFFF;');

// Replace Light RGBA with Dark RGBA
css = css.replace(/rgba\(250,\s*250,\s*249,\s*0\.95\)/g, 'rgba(18, 18, 18, 0.95)');
css = css.replace(/rgba\(250,\s*250,\s*249,\s*0\.98\)/g, 'rgba(18, 18, 18, 0.98)');
css = css.replace(/rgba\(250,250,249,0\.95\)/g, 'rgba(18,18,18,0.95)');
css = css.replace(/rgba\(250,250,249,0\.3\)/g, 'rgba(18,18,18,0.3)');

// Replace Shadows for better dark mode visibility
css = css.replace(/rgba\(0,\s*0,\s*0,\s*0\.05\)/g, 'rgba(0, 0, 0, 0.4)');
css = css.replace(/rgba\(0,0,0,0\.05\)/g, 'rgba(0,0,0,0.4)');
css = css.replace(/rgba\(0,0,0,0\.03\)/g, 'rgba(0,0,0,0.2)');
css = css.replace(/rgba\(0,0,0,0\.08\)/g, 'rgba(0,0,0,0.5)');
css = css.replace(/rgba\(0,0,0,0\.1\)/g, 'rgba(0,0,0,0.6)');

// Fix border-bottom lines which were accidentally matched by rgba(0,0,0,0.05) to rgba(0,0,0,0.4)
css = css.replace(/border-bottom: 1px solid rgba\(0,0,0,0\.4\);/g, 'border-bottom: 1px solid rgba(255,255,255,0.05);');

fs.writeFileSync('src/style.css', css);
console.log('Dark mode applied to CSS successfully.');
