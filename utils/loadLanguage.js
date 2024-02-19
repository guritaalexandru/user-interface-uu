// JavaScript Logic
let currentLanguage = 'en'; // Default language

// Function to load language JSON file
function loadLanguage(language) {
	fetch(`dictionaries/${language}.json`)
		.then(response => response.json())
		.then(data => {
			document.querySelectorAll('[data-language-tag]').forEach(element => {;
				const tag = element.getAttribute('data-language-tag');
				element.innerHTML = data[tag];
			});
		})
		.catch(error => console.error('Error loading language:', error));
}

// Initial loading of language based on default selection
loadLanguage(currentLanguage);

window.loadLanguage = loadLanguage;