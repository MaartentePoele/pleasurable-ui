console.log("test");

document.addEventListener("submit", async function(event) {

  const form = event.target
  // pak de form waarop geklikt wordt

  if (!form.classList.contains("like-form")) return
  // voer de code alleen uit voor de verwijder form

  event.preventDefault()
  // voorkom dat de pagina opnieuw laadt


  const feedbackPopup = document.querySelector(".feedback-popup")
  // pak de feedback popup uit de HTML


  const formData = new FormData(form)
  // verzamel alle data uit het formulier


  const response = await fetch(form.action, {
    method: form.method,
    body: new URLSearchParams(formData)
  })
  // verstuur de form data naar de verwijder route


  if (response.ok) {
    // controleer of de verwijder actie gelukt is


    const productCard = form.closest(".opgeslagen-product")
    // zoek de dichtstbijzijnde productkaart van deze form


    productCard.remove()
    // verwijder de productkaart direct uit de pagina


    feedbackPopup.classList.remove("hidden")
    // toon de feedback popup


    setTimeout(function() {

      feedbackPopup.classList.add("hidden")
      // verberg de popup weer na 2 seconden

    }, 2000)

  }

})

console.log("script werkt");

const forms = document.querySelectorAll(".add-to-list-form");

forms.forEach((form) => {

  const button = form.querySelector(".add-to-list");
  const image = document.querySelector(".product-image img");
  const wishlist = document.querySelector(".wishlist");

  let isAdded = false;

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    // reset states
    button.classList.remove("success", "error");

    // =====================
    // LOADING STATE
    // =====================
    button.classList.add("loading");

    button.innerHTML = `
      <span class="loader"></span>
      Loading...
    `;

    // =====================
    // CREATE FLY IMAGE
    // =====================
    const flyImg = image.cloneNode(true);
    flyImg.classList.add("fly-image");
    document.body.appendChild(flyImg);

    const start = image.getBoundingClientRect();
    const wishlistEl = document.querySelector(".wishlist");

    if (!wishlistEl) {
      console.log("❌ wishlist niet gevonden");
      return;
    }

    const end = wishlistEl.getBoundingClientRect();

    // START POSITION
    flyImg.style.position = "fixed";
    flyImg.style.left = start.left + "px";
    flyImg.style.top = start.top + "px";
    flyImg.style.width = "100px";
    flyImg.style.height = "100px";
    flyImg.style.zIndex = "9999";
    flyImg.style.transition = "all 0.9s cubic-bezier(.22,.61,.36,1)";

    // FORCE RENDER
    requestAnimationFrame(() => {

      flyImg.style.left = (end.left + end.width / 2) + "px";
      flyImg.style.top = (end.top + end.height / 2) + "px";
      flyImg.style.width = "20px";
      flyImg.style.height = "20px";
      flyImg.style.opacity = "0.2";

    });

    // CLEANUP
    setTimeout(() => {
      flyImg.remove();
    }, 1000);

    // =====================
    // SIMULATED SERVER DELAY
    // =====================
    setTimeout(() => {

      button.classList.remove("loading");

      // =====================
      // SUCCESS
      // =====================
      if (!isAdded) {

        isAdded = true;

        button.classList.add("success");
        button.innerHTML = "✓ Added";

        // =====================
        // 🟢 WISHLIST COUNTER +1
        // =====================
        const badge = document.querySelector(".badge");

        if (badge) {
          let count = parseInt(badge.textContent || "0");
          badge.textContent = count + 1;
        }

        showPopup(
          "Gift is added to the list",
          "success"
        );

      }

      // =====================
      // ERROR
      // =====================
      else {

        button.classList.add("error");
        button.innerHTML = "✖ Already added";

        showPopup(
          "Gift is already added to the list",
          "error"
        );
      }

    }, 1500);

  });

});

// =====================
// POPUP FUNCTION
// =====================
function showPopup(message, type) {

  const popup = document.createElement("div");

  popup.classList.add("popup", type);
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// =====================
// TAG FILTER STATE
// =====================
let activeTags = [];

// alle tags op detail page
const tagButtons = document.querySelectorAll(".tag-chip");

// alle producten (optioneel als je later lijst hebt)
const productDescription = document.querySelector(".description");

// =====================
// TAG CLICK HANDLER
// =====================
tagButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tag = btn.dataset.tag;

    // toggle active state
    if (activeTags.includes(tag)) {
      activeTags = activeTags.filter((t) => t !== tag);
      btn.classList.remove("active");
    } else {
      activeTags.push(tag);
      btn.classList.add("active");
    }

    console.log("Active filters:", activeTags);

    // hier kun je later filter logic koppelen
    updateUI();
  });
});

// =====================
// UI UPDATE (placeholder)
// =====================
function updateUI() {
  // nu alleen demo output
  // later: filter product grid

  if (activeTags.length === 0) {
    console.log("Geen filters actief");
  } else {
    console.log("Filtering op:", activeTags.join(", "));
  }
}