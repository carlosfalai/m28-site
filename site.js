/* Truck Stop Santé — script unique du site.
   Gestion du consentement aux témoins (cookies).
   Par défaut : AUCUN suivi. Aucun témoin publicitaire n'est déposé
   tant que la personne n'a pas cliqué sur « Accepter ». */
(function () {
  'use strict';

  var STORAGE_KEY = 'cmf-consent-v1';

  /* ============================================================
     <!-- GOOGLE_ADS_TAG_AFTER_CONSENT -->
     Le tag de conversion Google Ads doit être inséré ICI, à
     l'intérieur de loadAdsTag(). Cette fonction n'est exécutée
     QU'APRÈS un consentement explicite (clic sur « Accepter »).
     Exemple à activer (remplacer AW-XXXXXXXXX par l'identifiant réel) :

       var s = document.createElement('script');
       s.async = true;
       s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX';
       document.head.appendChild(s);
       window.dataLayer = window.dataLayer || [];
       window.gtag = function () { window.dataLayer.push(arguments); };
       window.gtag('js', new Date());
       window.gtag('config', 'AW-XXXXXXXXX');
     ============================================================ */
  function loadAdsTag() {
    /* Intentionnellement vide tant qu'aucun identifiant Google Ads
       n'a été configuré. Voir le bloc ci-dessus. */
  }

  function getConsent() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* stockage indisponible */ }
  }
  function clearConsent() {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) { /* stockage indisponible */ }
  }

  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  var refuseBtn = document.getElementById('cookie-refuse');
  var manageBtn = document.getElementById('manage-consent');

  function showBanner() { if (banner) { banner.hidden = false; } }
  function hideBanner() { if (banner) { banner.hidden = true; } }

  var consent = getConsent();
  if (consent === 'accepted') {
    loadAdsTag();
  } else if (consent !== 'refused') {
    showBanner();
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      setConsent('accepted');
      hideBanner();
      loadAdsTag();
    });
  }
  if (refuseBtn) {
    refuseBtn.addEventListener('click', function () {
      setConsent('refused');
      hideBanner();
    });
  }
  /* Bouton « Gérer mes préférences » (page confidentialite.html) :
     efface le choix enregistré et réaffiche la bannière. */
  if (manageBtn) {
    manageBtn.addEventListener('click', function () {
      clearConsent();
      showBanner();
    });
  }
})();
