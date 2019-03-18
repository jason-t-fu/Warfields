
function imagePromise(src, image) {
  // const image = new Image();
  image.src = src;
  return new Promise((resolve) => {
    image.onload = () => {
      resolve(image);
    };
  });
}

module.exports = imagePromise;