import { update_icon } from './update_icon.js';
import { suspects as all_suspects, weapons, locations } from './data.js';
export function catch_form_submit() {
	const start_form = document.getElementById('start_form');
	start_form.addEventListener('submit', function () {
		event.preventDefault();
		const player_data = {
			'player count': document.getElementById('player_count').value,
			players: {
				0: document.getElementById('player_1').value,
				1: document.getElementById('player_2').value,
				2: document.getElementById('player_3').value,
				3: document.getElementById('player_4').value,
				4: document.getElementById('player_5').value,
				5: document.getElementById('player_6').value,
			},
		};
		add_colgroup_data(player_data['player count']);
		add_player_headers(player_data);
		add_separator_row('Suspects');
		add_suspect_rows(player_data['player count']);
		add_separator_row('Weapons');
		add_weapon_rows(player_data['player count']);
		add_separator_row('Locations');
		add_location_rows(player_data['player count']);
		add_event_listeners_to_buttons();
		document.getElementById('notes_table').classList.remove('hide');
		set_player_name_height(player_data['player count']);
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

function add_colgroup_data(player_count) {
	const colgroup = document.createElement('colgroup'),
		header_col = document.createElement('col');
	header_col.span = 1;
	header_col.style.width = 'auto';
	colgroup.append(header_col);
	for (let $i = 0; $i < player_count; $i++) {
		const col = document.createElement('col');
		col.span = 1;
		col.style.width = '2rem';
		colgroup.append(col);
	}
	const table = document.getElementById('notes_table');
	table.prepend(colgroup);
}

function add_player_headers(player_data) {
	const players_row = document.getElementById('players_row'),
		header = document.createElement('th');
	header.scope = 'col';
	header.classList.add('player_heading');
	const player_label = header.cloneNode();
	player_label.innerHTML = 'Players:';
	player_label.classList.add('player_heading_label');
	players_row.append(player_label);

	for (let $i = 0; $i < player_data['player count']; $i++) {
		let player_header = header.cloneNode(),
			span = document.createElement('span');
		span.id = `player_name_${$i + 1}`;
		span.innerHTML = player_data.players[$i];
		player_header.append(span);
		players_row.append(player_header);
	}
}

function add_suspect_rows(player_count) {
	const table_body = document.getElementById('notes_table_body'),
		game_version = document.getElementById('game_version_new').checked ? 'white' : 'orchid',
		suspects = all_suspects;
	delete suspects[game_version];
	Object.entries(suspects).forEach((suspect) => {
		let [key, value] = suspect;
		const row_group = document.createElement('tr');
		const row_label = document.createElement('th');
		row_label.scope = 'row';
		row_label.innerHTML = value['long name'];
		row_group.append(row_label);
		for (let $i = 0; $i < player_count; $i++) {
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
	row_label.classList.add('divider');
	row_label.innerHTML = label;
	row.append(row_label);
	table_body.append(row);
}

function add_weapon_rows(player_count) {
	const table_body = document.getElementById('notes_table_body');
	Object.entries(weapons).forEach((weapon) => {
		const row_group = document.createElement('tr');
		const row_label = document.createElement('th');
		row_label.scope = 'row';
		row_label.innerHTML = weapon[1].name;
		row_group.append(row_label);
		for (let $i = 0; $i < player_count; $i++) {
			let row = create_button_row();
			row_group.append(row);
		}
		table_body.append(row_group);
	});
}
function add_location_rows(player_count) {
	const table_body = document.getElementById('notes_table_body');
	Object.entries(locations).forEach((room) => {
		let [key, value] = room;
		const row_group = document.createElement('tr');
		const row_label = document.createElement('th');
		row_label.scope = 'row';
		row_label.innerHTML = value.name;
		row_group.append(row_label);
		for (let $i = 0; $i < player_count; $i++) {
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

function set_player_name_height(player_count) {
	let largest_width = 0;
	for (let $i = 0; $i <= player_count; $i++) {
		if ($i > 0) {
			const span = document.getElementById(`player_name_${$i}`);
			const span_height = span.getBoundingClientRect().height;
			console.log({ span_height });
			largest_width = largest_width < span_height ? span_height : largest_width;
		}
	}
	const headings = document.getElementsByClassName('player_heading');
	for (let $i = 0; $i < headings.length; $i++) {
		if (largest_width < 32) {
			headings[$i].style.height = `3rem`;
		} else {
			headings[$i].style.height = `calc(${largest_width}px + 1rem)`;
		}
	}
}
