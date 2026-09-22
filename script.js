
const imageContainer = document.getElementById("image-container");
const reset = document.getElementById("reset");
const verify = document.getElementById("verify");
const para = document.getElementById("para");

let images = ["img1", "img2", "img3", "img4", "img5"];
let selectedImages = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateImages() {
  let duplicate = images[Math.floor(Math.random() * images.length)];

  let allImages = [...images, duplicate];

  shuffle(allImages);

  allImages.forEach(function (image, index) {
    let img = document.createElement("img");

    img.classList.add(image);
    img.dataset.image = image;
    img.dataset.index = index;

    img.addEventListener("click", function () {
      selectImage(img);
    });

    imageContainer.appendChild(img);
  });
}

function selectImage(img) {
  if (selectedImages.length >= 2) {
    return;
  }

  if (selectedImages.includes(img)) {
    return;
  }

  selectedImages.push(img);
  img.classList.add("selected");

  reset.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verify.style.display = "inline-block";
  }
}

reset.addEventListener("click", function () {
  selectedImages = [];

  document.querySelectorAll("img").forEach(function (img) {
    img.classList.remove("selected");
  });

  reset.style.display = "none";
  verify.style.display = "none";
  para.textContent = "";
});

verify.addEventListener("click", function () {
  let firstImage = selectedImages[0].dataset.image;
  let secondImage = selectedImages[1].dataset.image;

  if (firstImage === secondImage) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verify.style.display = "none";
});

generateImages();