let words = document.querySelectorAll(".word");
words.forEach((word)=>{
  let letters = word.textContent.split("");
  word.textContent="";
  letters.forEach((letter)=>{
      let span = document.createElement("span");
 span.textContent = letter;
 span.className = "letter";
 word.append(span);
  })
})


let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity= "1";

let changeText = ()=>{
let currentWord = words[currentWordIndex];
let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
 Array.from(currentWord.children).forEach((letter,i)=>{
     setTimeout(()=>{
         letter.className = "letter out";
     }, i * 80);
 })
 nextWord.style.opacity="1";
 Array.from(nextWord.children).forEach((letter,i)=>{
     letter.className = "letter behind";
     setTimeout(()=>{
         letter.className = "letter in";
     }, 340 + i * 80)
 })
 currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

// circle skill

const circles = document.querySelectorAll('.circle');

circles.forEach(elem=>{
 var dots = elem.getAttribute("data-dots");
 var marked = elem.getAttribute("data-percent");
 var percent = Math.floor(dots*marked/100);
 var points = "";
 var rotate = 360 / dots;
 
 
 for (let i = 0 ; i < dots ; i++) {
points += `<div class="points" style="--i:${i};  --rot:${rotate}deg"></div>`;
 }
 elem.innerHTML = points;
 
 const pointsMarked = elem.querySelectorAll('.points');
 for (let i = 0; i<percent ; i++) {
 pointsMarked[i].classList.add('marked')
 }
})


// mix it up portfolio section

var mixer = mixitup('.portfolio-gallery');





/* active menu */

let menuLi = document.querySelectorAll('header ul li a');

let section = document.querySelectorAll('section');


function activeMenu () {
    let len = section.length;
while (--len && window.scrollY + 97 < section[len].offsetTop) {}
menuLi.forEach(sec => sec.classList.remove("active"));
menuLi[len].classList.add("active");
}


activeMenu();
window.addEventListener("scroll", activeMenu);


/* sticky navbar */

const header = document.querySelector("header");
window.addEventListener("scroll", function(){
 header.classList.toggle("sticky", window.scrollY > 50)
})


/* toggle icon navbar */

let menuIcon = document.querySelector("#menu-icon");
let ul = document.querySelector("ul");

menuIcon.onclick = ()=>{
 menuIcon.classList.toggle("bx-x")
 ul.classList.toggle("open")
}

window.onscroll = ()=>{
 menuIcon.classList.remove("bx-x")
 ul.classList.remove("open")
}

/* parallax */

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
   entry.target.classList.add("show-items");
        }else {
entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));


const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));


const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));






/* contact */

const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address"); // Corrected variable name
const mess = document.getElementById("message");

function sendEmail() {
const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}`;

 Email.send({ 
      SecureToken: "bd6ae140-efe0-4027-9eeb-a53b35524e9c",
      To: 'adisaezekiel728@gmail.com', 
      From: "adisaezekiel728@gmail.com", 
      Subject: address.value, 
      Body: bodyMessage
    }).then(message => {
      if (message === "OK") {
        Swal.fire({ 
          title: "Successful", 
          text: "", 
          icon: "success" 
        });
      }
      }
  );
  }

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }
    
    if (items[1].value != "") {
      checkEmail();
    }
    
    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerText = "Invalid Email";
    } else {
      errorTxtEmail.innerText = "Email address can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
} 

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (!fullName.classList.contains("error") && 
      !email.classList.contains("error") && 
      !phone.classList.contains("error") && 
      !address.classList.contains("error") && 
      !mess.classList.contains("error")) {

    // Check if the user is online before sending
    if (navigator.onLine) {
      sendEmail();
      form.reset();
    } else {
   Swal.fire ({
        title: "No Internet Connection",
        text: "Kindly check your internet connection and try again.",
        icon: "error"
      });
    }
  }
});