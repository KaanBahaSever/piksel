const { path, fs } = window.electron;

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
currentIndex = 0;
imagePaths = [];

const showLoadingIcon = () => {
  document.getElementById('loading-icon').style.display = 'block';
};

const hideLoadingIcon = () => {
  document.getElementById('loading-icon').style.display = 'none';
};

const zoomImage = (factor, transformOrigin = 'center center') => {
  const img = document.getElementById('main-image');
  img.style.transform = `scale(${factor})`;
  img.style.transformOrigin = transformOrigin;
}

const zoomReset = () => {
  zoomFactor = 1;
  zoomImage(zoomFactor);
  img.style.transformOrigin = 'center center';
  img.style.left = 'unset';
  img.style.top = 'unset';
}

const loadImage = (src) => {
  const img = document.getElementById('main-image');
  img.style.display = 'none';

  const loadingTimeout = setTimeout(() => {
    showLoadingIcon();
  }, 5);

  img.onload = () => {
    clearTimeout(loadingTimeout);
    hideLoadingIcon();
    img.style.display = 'block';
  };
  img.src = src;
};

const previousImage = () => {
  zoomReset();
  const image = document.getElementById('main-image');
  currentIndex = (currentIndex - 1);
  if (currentIndex < 0) {
    currentIndex = imagePaths.length - 1;
  }
  loadImage(imagePaths[currentIndex]);
};

const nextImage = () => {
  zoomReset();
  const image = document.getElementById('main-image');
  currentIndex = (currentIndex + 1);
  if (currentIndex === imagePaths.length) {
    currentIndex = 0;
  }
  loadImage(imagePaths[currentIndex]);
};

window.electron.openFile((filePath) => {
  const dirPath = path.dirname(filePath);
  console.log('Directory path:', filePath);
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
    loadImage(imagePaths[currentIndex]);
  });

  document.getElementById('next-image-button').addEventListener('click', nextImage);
  document.getElementById('previous-image-button').addEventListener('click', previousImage);
});

//listen for keypresses
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    nextImage();
  }
  if (event.key === 'ArrowLeft') {
    previousImage();
  }
});

const img = document.getElementById('main-image');

zoomFactor = 1;
img.addEventListener('wheel', (event) => {
  if (event.deltaY < 0) {
    zoomFactor += 0.1;
  } else {
    zoomFactor -= 0.1;
    if (zoomFactor < 0.1) zoomFactor = 0.1; // Prevent zooming out too much
  }
  zoomImage(zoomFactor, `${event.offsetX}px ${event.offsetY}px`);
});

let isDragging = false;
let startX, startY, initialX, initialY;

img.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = img.offsetLeft;
    initialY = img.offsetTop;
    img.style.cursor = 'grabbing';
});

img.addEventListener('mouseleave', () => {
    isDragging = false;
    img.style.cursor = 'grab';
});

img.addEventListener('mouseup', () => {
    isDragging = false;
    img.style.cursor = 'grab';
});

img.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX - startX;
    const y = e.clientY - startY;
    img.style.left = `${initialX + x}px`;
    img.style.top = `${initialY + y}px`;
});