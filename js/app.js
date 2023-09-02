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
  const cardContainer = document.getElementById("card-container");
  const emptyCardContainer = document.getElementById("empty-card");
  cardContainer.innerHTML = "";
  emptyCardContainer.innerHTML = "";
  if (data.status) {
    data.data.forEach((course) => {
      const date = parseInt(course.others.posted_date);
      const hours = Math.round(date / 3600);
      const minutes = Math.round((date % 3600) / 60);

      const div = document.createElement("div");
      div.innerHTML = `
    <div
    class="card bg-base-100 h-96 p-4 shadow-xl"
  >
    <figure class="relative">
      <img
        src="${course.thumbnail}"
        alt="product"
        class="rounded-xl h-52"
      />
    </figure>
    <span>${
      course.others.posted_date
        ? `<span  class="absolute bottom-[44%] right-[15%] bg-[#171717] text-sm text-[#FFFFFF] p-1 rounded-md">${hours}hrs ${minutes}min ago</span>`
        : ``
    }</span>
<div class="flex flex-row gap-4">
<div><img class="w-[40px] h-[40px] rounded-full mt-4" src="${
        course.authors[0].profile_picture
      }"></div>
<div class="flex flex-col items-start pt-4">
<div>
  <h3 class="text-xl font-semibold">${course.title}</h3>
</div>
<div class="flex flex-row gap-4 items-center my-2">
  <h3>${course.authors[0].profile_name}</h3>
  ${course.authors[0].verified ? `<img src='../assets/verified.png'>` : ``}
</div>
<p> ${course.others.views} Views</p>
</div>
</div>
  </div>
    `;
      cardContainer.appendChild(div);
    });
  } else {
    const div = document.createElement("div");
    div.innerHTML = `
      <img class="mx-auto mt-12" src="../assets/Icon.png">
      <h2 class="text-3xl font-semibold text-center my-6">Oops!! Sorry, There is no content here</h2>
    `;
    emptyCardContainer.appendChild(div);
  }
};

handleCategory();
handleLoadCourse("1000");
