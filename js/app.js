const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const allCategory = data.data;
  //   get the tab container
  const tabContainer = document.getElementById("tab-container");
  //   display all category
  allCategory.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `<a onclick="handleLoadCourse(${category.category_id})" class="tab">${category.category}</a>`;
    tabContainer.appendChild(div);
  });
};

const handleLoadCourse = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  console.log(data.data);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.data.forEach((course) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div
    class="card bg-base-100  shadow-xl"
  >
    <figure class="">
      <img
        src="${course.thumbnail}"
        alt="product"
        class="rounded-xl h-52"
      />
    </figure>
    <div class="flex flex-col items-center justify-center pt-3">
      <div>
        <i class="fa-solid fa-star" style="color: #ffc107"></i>
        <i class="fa-solid fa-star" style="color: #ffc107"></i>
        <i class="fa-solid fa-star" style="color: #ffc107"></i>
        <i class="fa-regular fa-star" style="color: #ffc107"></i>
        <i class="fa-regular fa-star" style="color: #ffc107"></i>
      </div>
      <h2 class="card-title my-2">K. Accessories</h2>
      <p class="text-xl text-[#888888]">39.00 TK</p>
    </div>
  </div>
    `;
    cardContainer.appendChild(div);
  });
};

handleCategory();
handleLoadCourse("1000");
