# Pleasurable User Interface

Ontwerp en maak met een team voor een opdrachtgever een interface waar gebruikers blij van worden.

De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/pleasurable-ui/blob/main/docs/INSTRUCTIONS.md)

Team Figma vind je in: [deze link](https://www.figma.com/design/uefdOVEnmlZig2fmWEUZp4/Team-Milledoni?node-id=0-1&p=f&t=bdYD65gn1lY185F3-0)

Milledoni Figma vind je in: [Milledoni](https://www.figma.com/design/tHCHwBm3Ujv7wR28VU2BSu/Milledoni)

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->

## Wishlist pagina

De wishlist pagina is de plek waar alle opgeslagen cadeaus worden weergegeven. Wanneer een gebruiker op de homepagina een cadeau opslaat, komt deze automatisch terecht op de wishlist. Het doel van deze pagina is om gebruikers een overzicht te geven van alle cadeau ideeën die ze hebben opgeslagen zodat ze deze later makkelijk terug kunnen vinden.

Bij het ontwerpen van deze pagina heb ik geprobeerd om minder een webshop gevoel te creëren en meer een inspiratie pagina te maken. Daarom heb ik gekeken naar websites zoals Pinterest waar de focus ligt op ontdekken en inspiratie opdoen.

### detailpagina
<img width="959" height="476" alt="image" src="https://github.com/user-attachments/assets/746c57f9-a267-413f-95fe-7a7be3c0ed01" />

De detailpagina is de pagina waar in je de info van de cadeau te zien krijg en als je op de add to list knopje druk dan krijg je het in je wishlistje tabje via een fly animatie en dan krijg je een popup te zien waar er staat dat je cadeau is add to list en ik heb het zo gedaan om er tevoor zorgen dat het duidelijk is voor mensen om te kunnen zien wat er gebeurt.


### De lijstjes

Bovenaan de pagina staat een galerij met verschillende lijstjes. Hier kan de gebruiker tussen zijn eigen lijstjes wisselen. Ook heb ik rekening gehouden met het bekijken van lijstjes van andere gebruikers zodat bezoekers inspiratie kunnen halen uit cadeau ideeën van anderen.

Voor het ontwerp heb ik gekozen voor zachte ronde bolletjes. Deze vallen niet te veel op waardoor de aandacht op de producten blijft liggen. De actieve optie wordt groter weergegeven zodat duidelijk zichtbaar is welk lijstje op dat moment geselecteerd is.

<img width="885" height="146" alt="image" src="https://github.com/user-attachments/assets/ffe9d6c9-b63c-48a0-8dd4-d19046bb0987" />

---

### De ribbon

Tussen de lijstjes en de producten staat een ribbon. Deze zorgt voor een duidelijke scheiding tussen de verschillende onderdelen van de pagina.

Daarnaast sluit de ribbon goed aan bij de stijl van Milledoni. Door dezelfde kleuren en vormen te gebruiken blijft het ontwerp rustig en vormt alles samen één geheel.

<img width="1859" height="160" alt="Schermopname (280)" src="https://github.com/user-attachments/assets/116b1e22-9cad-46a4-aea6-f40e2fd8b923" />

---

### De product kaartjes

De product kaartjes hebben een lichte schaduw waardoor ze iets meer naar voren komen. Ik heb bewust geen border gebruikt omdat dit beter aansluit bij de kaartjes op de homepagina.

Voor de layout heb ik gekozen voor een ongelijk grid. Hierdoor ontstaat een speelser ontwerp en voelt de pagina minder als een standaard webshop. Dit sluit ook beter aan bij de wensen van de opdrachtgever die graag meer een inspiratie platform wilde creëren.

De afbeeldingen krijgen veel ruimte zodat de producten goed zichtbaar zijn en gebruikers sneller inspiratie kunnen opdoen.

<img width="464" height="662" alt="Schermopname (279)" src="https://github.com/user-attachments/assets/1c51f1f3-84fb-49cc-8bc0-75d9675484d3" />

---

### Client side verwijder popup

Om de gebruiker feedback te geven wanneer een product uit de wishlist wordt verwijderd heb ik een client side verwijder popup gemaakt.

Wanneer een gebruiker op verwijderen klikt verschijnt er direct een melding dat het product succesvol uit de wishlist is gehaald. Hierdoor weet de gebruiker dat de actie gelukt is en hoeft die niet te twijfelen of het product echt verwijderd is.

De popup werkt volledig aan de client side waardoor de feedback direct zichtbaar is zonder dat de pagina opnieuw hoeft te laden. Dit zorgt voor een prettigere gebruikerservaring.

In onderstaande issue heb ik dit onderdeel verder uitgewerkt : https://github.com/MaartentePoele/pleasurable-ui/issues/46


# Spotters pagina:
- Spotters zijn mensen die een cadeau hebben gevonden en dit kunnen toevoegen aan de website, zodat anderen het cadeau kunnen bekijken en zo dus inspiratie kunnen opdoen. Op de spotterspagina kun je je aanmelden als spotter. Bovenaan de pagina staat een korte uitleg over wat het spotterschap inhoudt. Onderaan zie je een overzicht van de mensen die zich al als spotter hebben aangemeld.## Mobile design
<img width="113" height="290" alt="image" src="https://github.com/user-attachments/assets/1add014c-f1c5-46a4-b774-dd1299dbaa12" />

## Desktop design
<img width="259" height="253" alt="image" src="https://github.com/user-attachments/assets/763a23c5-253a-47e9-a269-1f59706c5727" />

## Form
<img width="262" height="254" alt="image" src="https://github.com/user-attachments/assets/820fe289-f78f-4322-9679-e416e4666131" />
- Wanneer je op de aanmeldknop klikt, verschijnt er een formulier waarmee een spotter zich kan aanmelden. Na het invullen en verzenden van het formulier worden de nieuwe spotter en de ingevulde gegevens direct toegevoegd aan de spotterslijst onderaan de pagina.
## Succes state
<img width="258" height="257" alt="image" src="https://github.com/user-attachments/assets/9cd093ab-a4ca-4e2c-8f04-b431dd01a9ab" />








## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
