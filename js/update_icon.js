export function update_icon() {
	const current_icon = this.dataset.current_icon,
		button = this;
	switch (current_icon) {
		case 'none':
			button.dataset.current_icon = 'cross';
			button.innerHTML =
				'<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
			break;
		case 'cross':
			button.dataset.current_icon = 'tick';
			button.innerHTML =
				'<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
			break;
		case 'tick':
			button.dataset.current_icon = 'question_mark';
			button.innerHTML =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080"><path d="M669.03 705.16H412.9V461.29c18.06 1.29 31.39 1.94 40 1.94 49.03 0 84.73-10.42 107.1-31.29 22.36-20.86 33.55-54.08 33.55-99.68 0-73.55-19.35-110.32-58.06-110.32s-56.13 37.85-56.13 113.55H220c0-93.33 19.57-166.02 58.71-218.06C304.94 81.3 341.5 52.7 388.39 31.62 431.83 10.55 481.07 0 536.13 0c94.62 0 172.26 30.75 232.9 92.26 60.65 61.51 90.97 140 90.97 235.48 0 73.13-16.03 133.01-48.06 179.68-32.04 46.67-79.68 78.39-142.9 95.16v102.58Zm24.52 225.81c0 41.29-14.84 76.35-44.52 105.16-30.55 29.26-65.81 43.87-105.81 43.87s-75.92-14.62-106.45-43.87c-29.26-30.54-43.87-66.23-43.87-107.1s14.62-77.2 43.87-107.74c28.81-29.68 64.08-44.52 105.81-44.52s78.28 15.06 107.1 45.16c29.25 30.55 43.87 66.88 43.87 109.03Z"/></svg>';
			break;
		case 'question_mark':
			button.dataset.current_icon = 'none';
			button.innerHTML = '';
			break;
	}
	preventLossOfNotes();
}
const beforeUnloadListener = (event) => {
	event.preventDefault();
	return event.returnValue = "Are you sure you want to exit? You'll lose any in progress notes.";
}
function preventLossOfNotes() {
	let ticks = document.querySelectorAll('.change_icon[data-current_icon="tick"]');
	let crosses = document.querySelectorAll('.change_icon[data-current_icon="cross"]');
	let question_marks = document.querySelectorAll('.change_icon[data-current_icon="question_mark"]');
	if (ticks.length > 0 || crosses > 0 || question_marks > 0) {
		window.addEventListener("beforeunload", beforeUnloadListener, {capture: true});
	} else {
		window.removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
	}
}