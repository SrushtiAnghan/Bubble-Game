const circles = document.querySelectorAll(".circle");
const texts = document.querySelectorAll(".colorName");

let data = [];
let selectedId = 0;

function onClickHandler(id) {
  selectedId = id
  reload()
}

function reload(type) {
  let History = [];
  History = JSON.parse(window.localStorage.getItem("colors")) || [];
  let html = "";
  const btn = document.querySelector("#prevBtn");

  if (type == "reload") {
    selectedId = History.length;
  }

  // if (History.length > 1) {
  //   btn.classList.add("btnBg");
  // } else {
  //   btn.classList.remove("btnBg");
  // }

  if (History.length !== 0) {
    document.querySelector("#circle1").style.backgroundColor = `#${History[selectedId - 1].one}`;
    document.querySelector("#colorName1").innerHTML = `#${History[selectedId - 1].one}`;

    document.querySelector("#circle2").style.backgroundColor = `#${History[selectedId - 1].two}`;
    document.querySelector("#colorName2").innerHTML = `#${History[selectedId - 1].two}`;

    document.querySelector("#circle3").style.backgroundColor = `#${History[selectedId - 1].three}`;
    document.querySelector("#colorName3").innerHTML = `#${History[selectedId - 1].three}`;
  }

  History.forEach((element) => {
    html += `<div class="history_container" >
            <div class="History_01  ${element.id == selectedId ? "back" : ""}"  onClick= "onClickHandler(${element.id})">
              <div class="History" id="History1" style="background-color: #${element.one};"></div>
              <div class="History" id="History2" style="background-color: #${element.two};"></div>
               <div class="History" id="History3" style="background-color: #${element.three};"></div>
           </div>
         </div>`;
  });

  let HistoryData = document.querySelector(".updateHistory");
  if (History.length !== 0) {
    HistoryData.innerHTML = html;
  } else {
    return;
  }
}
function next() {
  selectedId++;

  let localStorageData =
    JSON.parse(window.localStorage.getItem("colors")) || [];
  document.getElementById("text").innerHTML = "";

  let lengthId = localStorageData?.length + 1 || 1;

  let randomColorOne = Math.floor(Math.random() * 16777215).toString(16);
  let randomColorTwo = Math.floor(Math.random() * 16777215).toString(16);
  let randomColorThree = Math.floor(Math.random() * 16777215).toString(16);

  if (localStorageData.length == selectedId - 1) {
    window.localStorage.setItem(
      "colors",
      JSON.stringify([
        ...localStorageData,
        {
          id: lengthId,
          one: randomColorOne,
          two: randomColorTwo,
          three: randomColorThree,
        },
      ])
    );
  }
  document.querySelector("#circle1").style.backgroundColor = `#${randomColorOne}`;
  document.querySelector("#colorName1").innerHTML = `#${randomColorOne}`;

  document.querySelector("#circle2").style.backgroundColor = `#${randomColorTwo}`;
  document.querySelector("#colorName2").innerHTML = `#${randomColorTwo}`;

  document.querySelector("#circle3").style.backgroundColor = `#${randomColorThree}`;
  document.querySelector("#colorName3").innerHTML = `#${randomColorThree}`;
  reload();
}

function prev() {
  if (selectedId > 1) {
    selectedId--;
    reload();
  }

}

reload("reload");
