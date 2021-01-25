import { suspects, weapons, locations } from './data.js';
export function create_suspect_select() {
	const select = document.createElement('select');
	const suspects_array = Object.entries(suspects);
	suspects_array.forEach((suspect) => {
		let [key, value] = suspect;
		let option = document.createElement('option');
		option.innerHTML = value['long name'];
		select.append(option);
	});
	return select;
}
export function create_weapon_select() {
	const select = document.createElement('select');
	weapons.forEach((weapon) => {
		let option = document.createElement('option');
		option.innerHTML = weapon.name;
		select.append(option);
	});
	return select;
}
export function create_room_select() {
	const select = document.createElement('select');
	locations.forEach((room) => {
		let option = document.createElement('option');
		option.innerHTML = room.name;
		select.append(option);
	});
	return select;
}
export function require_names_for_players() {
	const player_count = document.getElementById('player_count').value;
	for (let $i = 0; $i < 6; $i++) {
		const player_number = $i + 1,
			input = document.getElementById(`player_${player_number}`);
		input.required = player_number <= player_count ? true : false;
	}
}
