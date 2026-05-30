const aanmeldenknop = document.getElementById("popup-knop")
const openknop = document.getElementById("popup-melden")

aanmeldenknop.addEventListener("click", function () {
    openknop.classList.toggle("open");
    aanmeldenknop.classList.toggle("close");
});
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
