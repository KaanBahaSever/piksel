const { path, fs } = window.electron;

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
currentIndex = 0;
imagePaths = [];

console.log("renderer.js loaded");

const previousImage = () => {
  const image = document.getElementById('main-image');
  currentIndex = (currentIndex - 1);
  if (currentIndex < 0) {
    currentIndex = imagePaths.length - 1;
  }
  image.src = imagePaths[currentIndex];
};

const nextImage = () => {
  const image = document.getElementById('main-image');
  currentIndex = (currentIndex + 1);
  if (currentIndex === imagePaths.length) {
    currentIndex = 0;
  }
  image.src = imagePaths[currentIndex];
};

window.electron.openFile((filePath) => {
  const img = document.getElementById('main-image');
  img.src = `file://${filePath}`;

  const dirPath = path.dirname(filePath);

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    imagePaths = files.filter(file => imageExtensions.includes(path.extname(file).toLowerCase()));
    imagePaths.forEach((file, index) => {
      imagePaths[index] = `file://${path.join(dirPath, file)}`;
    });

    currentIndex = imagePaths.indexOf(`file://${filePath}`);
  });

  document.getElementById('next-image-button').addEventListener('click', nextImage);
  document.getElementById('previous-image-button').addEventListener('click', previousImage);
});

/* window.addEventListener('DOMContentLoaded', () => {

  const image = document.getElementById('main-image');
  const currentDir = __dirname;
  fs.readdir(currentDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    imagePaths = files.filter(file => imageExtensions.includes(path.extname(file).toLowerCase()));
    image.src = `file://${path.join(currentDir, imagePaths[0])}`;
  });
  
}); */

//listen for keypresses
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    nextImage();
  }
  if (event.key === 'ArrowLeft') {
    previousImage();
  }

});