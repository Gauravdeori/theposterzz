// AUTO LOAD INSTAGRAM-STYLE POSTS
const postImages = [
  "posts/post1.jpg",
  "posts/post2.jpg",
  "posts/post3.jpg",
  "posts/post4.jpg",
  "posts/post5.jpg",
  "posts/post6.jpg"
];

const grid = document.getElementById("instaGrid");

postImages.forEach(src => {
  const post = document.createElement("div");
  post.className = "insta-post";

  const img = document.createElement("img");
  img.src = src;
  img.alt = "theposterzz post";

  post.appendChild(img);

  post.onclick = () => {
    window.open("https://www.instagram.com/theposterzz", "_blank");
  };

  grid.appendChild(post);
});
