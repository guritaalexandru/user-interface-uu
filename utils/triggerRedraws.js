function triggerRedraws() {
	const headerElement = document.querySelector('header-component');
	headerElement.setAttribute('trigger-redraw', 'true');

	window.loadLanguage(window.globalState.language);
}

window.triggerRedraws = triggerRedraws;