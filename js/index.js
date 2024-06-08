function onNavigationLanguageButtonClick() {
    const element = document.getElementById("navigationLanguagePopup")
    const classList = element.classList

    if (classList.contains("hidden")) classList.remove("hidden")
    else classList.add("hidden")
}

function changeLanguage(lang) {
    localStorage.setItem("currentLanguage", lang)
    doTranslations(lang)
}