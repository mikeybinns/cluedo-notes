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
			button.dataset.current_icon = 'none';
			button.innerHTML = '';
			break;
	}
}
