import { suspects, weapons, locations } from "./data.js";
export function create_suspect_select() {
	const select = document.createElement("select");
	const suspects_array = Object.entries(suspects);
	suspects_array.forEach((suspect) => {
		let [key, value] = suspect;
		let option = document.createElement("option");
		option.innerHTML = value["long name"];
		select.append(option);
	});
	return select;
}
export function create_weapon_select() {
	const select = document.createElement("select");
	weapons.forEach((weapon) => {
		let option = document.createElement("option");
		option.innerHTML = weapon.name;
		select.append(option);
	});
	return select;
}
export function create_room_select() {
	const select = document.createElement("select");
	locations.forEach((room) => {
		let option = document.createElement("option");
		option.innerHTML = room.name;
		select.append(option);
	});
	return select;
}
export function update_player_fields() {
	const player_count = document.getElementById("player_count").value;
	for (let $i = 0; $i < 6; $i++) {
		const player_number = $i + 1,
			field_group = document.getElementById(`field_player_${player_number}`),
			input = document.getElementById(`player_${player_number}`);
		if (player_number <= player_count) {
			input.required = true;
			field_group.classList.remove("hide");
		} else {
			input.required = false;
			field_group.classList.add("hide");
		}
	}
}
