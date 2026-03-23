const fs = require('fs');
const path = require('path');

const seqDir = path.join(__dirname, 'public/images/sequence');
fs.mkdirSync(seqDir, { recursive: true });

// 1x1 gray JPEG
const jpegBase64 = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";
const jpegBuffer = Buffer.from(jpegBase64, 'base64');

for (let i = 1; i <= 192; i++) {
  const padded = i.toString().padStart(3, '0');
  fs.writeFileSync(path.join(seqDir, `ezgif-frame-${padded}.jpg`), jpegBuffer);
}

// 10x20 blue PNG to represent the bottle
const bluePngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAYAAAC9h+SRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBJREFUeNpi/P//PwM1ARMDlcGoQkYNGDXIQEEDAwPj//9kGEAOMmoQhgYYAAgwAEE3ExE71K/DAAAAAElFTkSuQmCC";
const bluePngBuffer = Buffer.from(bluePngBase64, 'base64');
fs.writeFileSync(path.join(__dirname, 'public/images/prime-bottle-static.png'), bluePngBuffer);

console.log("Dummy images generated successfully.");
