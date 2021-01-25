import { update_icon } from './update_icon.js';
import { weapons, locations } from './data.js';
export function catch_form_submit() {
	const start_form = document.getElementById('start_form');
	start_form.addEventListener('submit', function () {
		event.preventDefault();
		const form_data = {
			'player count': document.getElementById('player_count').value,
			players: {
				0: document.getElementById('player_1').value,
				1: document.getElementById('player_2').value,
				2: document.getElementById('player_3').value,
				3: document.getElementById('player_4').value,
				4: document.getElementById('player_5').value,
				5: document.getElementById('player_6').value,
			},
			suspects: {
				0: document.getElementById('suspect_1').value,
				1: document.getElementById('suspect_2').value,
				2: document.getElementById('suspect_3').value,
				3: document.getElementById('suspect_4').value,
				4: document.getElementById('suspect_5').value,
				5: document.getElementById('suspect_6').value,
			},
		};
		add_player_headers(form_data);
		add_separator_row('Suspects');
		add_suspect_rows(form_data);
		add_separator_row('Weapons');
		add_weapon_rows(form_data);
		add_separator_row('Locations');
		add_location_rows(form_data);
		add_event_listeners_to_buttons();
		document.getElementById('notes_table').classList.remove('hide');
		document.getElementById('start_screen').classList.add('hide');
	});
}

function create_button_row() {
	const button = document.createElement('button');
	button.classList.add('change_icon');
	button.dataset.current_icon = 'none';
	button.addEventListener('click', update_icon);
	const row = document.createElement('td');
	row.append(button);
	return row;
}

function add_player_headers(form_data) {
	const players_row = document.getElementById('players_row');
	const header = document.createElement('th');
	header.scope = 'col';
	header.classList.add('player_heading');
	const player_label = header.cloneNode();
	player_label.innerHTML = 'Players:';
	player_label.classList.add('player_heading_label');
	players_row.append(player_label);

	for (let $i = 0; $i < form_data['player count']; $i++) {
		let player_header = header.cloneNode();
		player_header.innerHTML = form_data.players[$i];
		players_row.append(player_header);
	}
}

function add_suspect_rows(form_data) {
	const table_body = document.getElementById('notes_table_body');
	Object.entries(form_data.suspects).forEach((suspect) => {
		let [key, value] = suspect;
		const row_group = document.createElement('tr');
		const row_label = document.createElement('th');
		row_label.scope = 'row';
		row_label.innerHTML = value;
		row_group.append(row_label);
		for (let $i = 0; $i < form_data['player count']; $i++) {
			let row = create_button_row();
			row_group.append(row);
		}
		table_body.append(row_group);
	});
}

function add_separator_row(label) {
	const row = document.createElement('tr'),
		row_label = document.createElement('th'),
		table_body = document.getElementById('notes_table_body');
	row_label.innerHTML = label;
	row.append(row_label);
	table_body.append(row);
}

function add_weapon_rows(form_data) {
	const table_body = document.getElementById('notes_table_body');
	Object.entries(weapons).forEach((weapon) => {
		const row_group = document.createElement('tr');
		const row_label = document.createElement('th');
		row_label.scope = 'row';
		row_label.innerHTML = weapon[1].name;
		row_group.append(row_label);
		for (let $i = 0; $i < form_data['player count']; $i++) {
			let row = create_button_row();
			row_group.append(row);
		}
		table_body.append(row_group);
	});
}
function add_location_rows(form_data) {
	const table_body = document.getElementById('notes_table_body');
	Object.entries(locations).forEach((room) => {
		let [key, value] = room;
		const row_group = document.createElement('tr');
		const row_label = document.createElement('th');
		row_label.scope = 'row';
		row_label.innerHTML = value.name;
		row_group.append(row_label);
		for (let $i = 0; $i < form_data['player count']; $i++) {
			let row = create_button_row();
			row_group.append(row);
		}
		table_body.append(row_group);
	});
}

function add_event_listeners_to_buttons() {
	const buttons = document.getElementsByClassName('change_icon');
	for (let $i = 0; $i < buttons.length; $i++) {
		buttons[$i].addEventListener('click', update_icon);
	}
}
