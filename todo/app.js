const date = document.querySelector(".date");
const textInput = document.querySelector(".text-input");
const addIcon = document.querySelector(".fa-plus");
const gorevler = document.querySelector(".gorevler");
const gorevlerH3 = document.querySelector(".gorevler-h3");
const removeIcon = document.querySelector(".fa-remove");
const checkIcon = document.querySelector(".fa-check");
const complete = document.querySelector(".complete-ul");
const completeH3 = document.querySelector(".complete-h3");
const deleteIcon = document.querySelector(".fa-trash-can");

let gorevlerTodo = [];
let tamamlananlarTodo = [];

runMethods();

function runMethods() {
  dateGet();
  baslikGorevKontrol();
  baslikTamamlananKontrol();
  document.addEventListener("DOMContentLoaded", pageLoaded);
  document.addEventListener("keyup", add);
  addIcon.addEventListener("click", addTodo);
  gorevler.addEventListener("click", removeGorev);
  gorevler.addEventListener("click", checkTodo);
  complete.addEventListener("click", deleteTodo);
}

//! Tarih
function dateGet() {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let fullDate = today.toLocaleDateString("tr-TR", options);
  let html = `
  <h3>${fullDate}</h3>
  `;
  date.insertAdjacentHTML("afterbegin", html);
}

//! Başlık Kontrol
function baslikGorevKontrol() {
  if (gorevler.children.length === 0) {
    gorevlerH3.style.display = "none";
  } else {
    gorevlerH3.style.display = "block";
  }
}
function baslikTamamlananKontrol() {
  if (complete.children.length === 0) {
    completeH3.style.display = "none";
  } else {
    completeH3.style.display = "block";
  }
}

//! Görev Ekle
function addTodo(e) {
  const text = textInput.value.trim();
  if (text == "" || text == null) {
    alert("Boş bırakmayınız");
  } else {
    addTodoUI(text);
    baslikGorevKontrol();

    addStorageGorevler(text);
  }
  e.preventDefault();
}

//! Görev Ekle UI
function addTodoUI(text) {
  const html = `
  <li>
  <p>${text}</p>
  <div>
    <a href=""><i class="fa fa-remove"></i></a>

    <a href=""><i class="fa fa-check"></i></a>
  </div>
</li>
  `;
  gorevler.insertAdjacentHTML("afterbegin", html);
  textInput.value = "";
}
//! Görevler Listesinden Öge Silinmesi
function removeGorev(e) {
  if (e.target.className === "fa fa-remove") {
    const gorev = e.target.parentElement.parentElement.parentElement;
    gorev.remove();
    baslikGorevKontrol();
    gorevlerTodo.forEach(function (todo, index) {
      if (gorev.textContent.trim() == todo) {
        gorevlerTodo.splice(index, 1);
      }
    });
    localStorage.setItem("gorevlerTodo", JSON.stringify(gorevlerTodo));
  }
  e.preventDefault();
}

//! Görevler Listesinden Tamamlanan Listesine Ekleme
function checkTodo(e) {
  if (e.target.className === "fa fa-check") {
    const tamamlanan = e.target.parentElement.parentElement.parentElement;
    const text = tamamlanan.textContent.trim();
    addTamamlananUI(text);
    baslikTamamlananKontrol();
    addStorageTamamlananlar(text);
    tamamlanan.remove();
    baslikGorevKontrol();
    //? Tamamlananlar listesine eklenen ögenin görevler listesinden silinmesi
    gorevlerTodo.forEach(function (gorev, index) {
      if (text == gorev) {
        gorevlerTodo.splice(index, 1);
      }
    });
    localStorage.setItem("gorevlerTodo", JSON.stringify(gorevlerTodo));
  }
}
//! Tamamlananlar UI
function addTamamlananUI(text) {
  let html = `
  <li>
              <p>${text}</p>
              <div>
                <a href=""><i class="fa-solid fa-trash-can"></i></a>
              </div>
            </li>
  `;
  complete.insertAdjacentHTML("afterbegin", html);
}

//! Tamamlananlar Listesinden Öge Silinmesi
function deleteTodo(e) {
  const onay = confirm("Kalıcı Olarak Silinecek");
  if (onay) {
    if (e.target.className === "fa-solid fa-trash-can") {
      const removeTodo = e.target.parentElement.parentElement.parentElement;
      removeTodo.remove();
      baslikTamamlananKontrol();
      tamamlananlarTodo.forEach(function (todo, index) {
        if (removeTodo.textContent.trim() == todo) {
          tamamlananlarTodo.splice(index, 1);
        }
      });
      localStorage.setItem(
        "tamamlananlarTodo",
        JSON.stringify(tamamlananlarTodo)
      );
    }
  }
  e.preventDefault();
}
function checkStorageGorev() {
  if (localStorage.getItem("gorevlerTodo") === null) {
    gorevlerTodo = [];
  } else {
    gorevlerTodo = JSON.parse(localStorage.getItem("gorevlerTodo"));
  }
}
function checkStorageTamamlanan() {
  if (localStorage.getItem("tamamlananlarTodo") === null) {
    tamamlananlarTodo = [];
  } else {
    tamamlananlarTodo = JSON.parse(localStorage.getItem("tamamlananlarTodo"));
  }
}
function addStorageGorevler(gorev) {
  checkStorageGorev();
  gorevlerTodo.push(gorev);
  localStorage.setItem("gorevlerTodo", JSON.stringify(gorevlerTodo));
}
function addStorageTamamlananlar(tamamlanan) {
  checkStorageTamamlanan();
  tamamlananlarTodo.push(tamamlanan);
  localStorage.setItem("tamamlananlarTodo", JSON.stringify(tamamlananlarTodo));
}
function pageLoaded() {
  checkStorageGorev();
  gorevlerTodo.forEach((gorev) => addTodoUI(gorev));

  checkStorageTamamlanan();
  tamamlananlarTodo.forEach((tamamlanan) => addTamamlananUI(tamamlanan));

  baslikGorevKontrol();
  baslikTamamlananKontrol();
}
function add(e) {
  if (e.keyCode == 13) {
    addTodo();
  }
}
