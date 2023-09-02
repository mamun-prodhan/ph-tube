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
  console.log(data);
  const cardContainer = document.getElementById("card-container");
  const emptyCardContainer = document.getElementById("empty-card");
  cardContainer.innerHTML = "";
  emptyCardContainer.innerHTML = "";
  if (data.status) {
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
      <img 
      src="${course.authors[0].profile_picture}"
      alt="author"
      class="w-12 h-12 rounded-full"
      >
      <h3>${course.title}</h3>
    </div>
    <div>
      <h3>${course.authors[0].profile_name}</h3>
      ${course.authors[0].verified ? `<img src='../assets/verified.png'>` : ``}
    </div>
    <p> ${course.others.views} Views</p>
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
