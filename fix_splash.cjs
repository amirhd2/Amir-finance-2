const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Fix the head links
html = html.replace(
    '<link rel="apple-touch-startup-image" href="./splash-portrait.png" media="(orientation: portrait)" />',
    '<link rel="apple-touch-startup-image" href="/splash-portrait.jpg" media="(orientation: portrait)" />'
);
html = html.replace(
    '<link rel="apple-touch-startup-image" href="./splash-landscape.png" media="(orientation: landscape)" />',
    '<link rel="apple-touch-startup-image" href="/splash-landscape.jpg" media="(orientation: landscape)" />'
);

// Fix the picture block
const pictureBlockRegex = /<picture[^>]*>[\s\S]*?<\/picture>/;
const newPictureBlock = `<picture style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <source media="(orientation: landscape)" srcset="/splash-landscape.jpg?v=2.2.3" />
            <source media="(orientation: portrait)" srcset="/splash-portrait.jpg?v=2.2.3" />
            <img src="/splash-portrait.jpg?v=2.2.3" alt="Amir Finance Splash" style="width:100%;height:100%;object-fit:cover;object-position:center;background-color:#0b101d;" />
        </picture>`;

html = html.replace(pictureBlockRegex, newPictureBlock);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed index.html splash references');
