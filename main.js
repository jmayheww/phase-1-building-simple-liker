// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";
const errorModal = document.querySelector("#modal");

// Your JavaScript code goes here!

/*
X Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads
X  When a user clicks on an empty heart:
X Invoke mimicServerCall to simulate making a server request
X  When the "server" returns a failure status:
X Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
X  Display the error modal by removing the .hidden class
X Display the server error message in the modal
X Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
  When the "server" returns a success status:
  Change the heart to a full heart
  Add the .activated-heart class to make the heart appear red
  When a user clicks on a full heart:
  Change the heart back to an empty heart
  Remove the .activated-heart class
  Keep all your styling rules entirely in style.css. Do not manipulate any .style properties.
  Only manipulate the DOM once the server request responds. Do not make the heart full until you're inside a successful .then block.

*/

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM CONTENT HAS LOADED");
  hideError();

  // call findLikes

  findLikes();
});

function hideError() {
  errorModal.classList.add("hidden");
}

// need an event listener on all of the hearts

function findLikes() {
  const likeArr = document.querySelectorAll(".like-glyph");

  likeArr.forEach((singularLike) => {
    return singularLike.addEventListener(
      "click",
      (event) => {
        mimicServerCall()
          .then((resp) => {
            console.log("check resp test");

            const activated = event.target.classList.contains("activated-heart");

            if (activated) {
               event.target.classList.remove("activated-heart");
               event.target.innerHTML = EMPTY_HEART;
            } else {
              event.target.classList.add("activated-heart");
              event.target.innerHTML = FULL_HEART;

            }



          }) //.300ms
          .catch((error) => {
            //condition for error, when promise fails, catch() catches it
            console.log(error);
            errorModal.classList.remove("hidden");
            setTimeout(() => {
              console.log("do something after some seconds");
              hideError();
            }, 3000);
          });
      }

      // {console.log("You found me!");
      // When seeing .catch() or .then(), we are dealing with a PROMISE! ASYNC We need .then in promise!
    );
  });

  // likeArr.forEach((singularLike) => {
  //   singularLike.addEventListener("click", () =>
  //     console.log("You found me! Like!")
  // for (let i = 0; i < likeArr.length; i++) {
  //   return likeArr[i].addEventListener("click", () => console.log("You found me!"))
  // }
  //   );
  // });
}

// what if I make

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
