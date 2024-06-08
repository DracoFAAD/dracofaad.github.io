let elements = {}

let cache = {}

window.addEventListener("load", ev => {
    registerElements()
    load()
})

function registerElements() {
    const elementsWithClasses = document.getElementsByClassName("translatable")
    for (const element of elementsWithClasses) {
        const translationID = element.getAttribute("translationId")
        elements[translationID] = element
    }
}

function load() {
    let currentLanguage = localStorage.getItem("currentLanguage")

    if (currentLanguage == undefined) {
        currentLanguage = "en_us"
        localStorage.setItem("currentLanguage", currentLanguage)
        doTranslations(currentLanguage)
    } else {
        doTranslations(currentLanguage)
    }
}

// Checks expiration & if stored is valid. Returns false if valid. True if not
function checkJsonFile(returnedLanguage) {
    let json = JSON.parse(returnedLanguage)

    return json.expires == undefined || json.stored == undefined || json.expires <= Date.now();
}

async function doTranslations(language) {
    let translations = localStorage.getItem(language)
    
    if (translations == undefined || checkJsonFile(translations)) {
        const translationsFetch = await fetch("./translations/" + language + ".json")

        translations = await translationsFetch.json()
        localStorage.setItem(language, JSON.stringify({expires:Date.now() + 5 * 60 * 1000, stored: translations}))
    } else {
        translations = JSON.parse(translations).stored
    }

    for (const key in elements) {
        const element = elements[key];

        element.innerHTML = translations[key]
    }
}