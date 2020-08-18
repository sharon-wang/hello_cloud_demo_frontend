window.addEventListener('load', () => {
	async function addContact() {
		const data = {
			'firstName': add_contact_first_name_input.value,
			'lastName': add_contact_last_name_input.value,
			'email': add_contact_email_input.value
		};

		const response = await submitPOSTRequest(data);

		if (response.ok) {
			add_contact_data_p.innerText = response.json();
		} else {
			add_contact_data_p.innerText = 'Request failed with: ' + response.statusText;
		}
	}

	async function getContact() {
		const url_search_params = new URLSearchParams({
			'firstName': get_contact_first_name_input.value,
			'lastName': get_contact_last_name_input.value
		});

		const response = await submitGETRequest(serverEndpointGETurl + '?' + url_search_params);
		// const response = await submitGETRequest(serverEndpointGETurl + '?firstName=Igor&lastName=Braga');

		if (response.ok) {
			get_contact_data_p.innerText = response.json();
		} else {
			get_contact_data_p.innerText = 'Request failed with: ' + response.statusText;
		}
	}

	// TODO: error handling
	async function submitGETRequest(url = '') {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow'
		});

		return response;
	}

	// TODO: error handling
	async function submitPOSTRequest(requestBody = {}) {
		const response = await fetch(serverEndpointPOSTurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			body: JSON.stringify(requestBody)
		});

		return response;
	}

	// addContact elements
	const add_contact_form = document.getElementById('add_contact_form');
	const add_contact_first_name_input = document.getElementById('add_contact_first_name_input');
	const add_contact_last_name_input = document.getElementById('add_contact_last_name_input');
	const add_contact_email_input = document.getElementById('add_contact_email_input');
	const add_contact_data_p = document.getElementById('add_contact_data_p');

	// getContact elements
	const get_contact_form = document.getElementById('get_contact_form');
	const get_contact_first_name_input = document.getElementById('get_contact_first_name_input');
	const get_contact_last_name_input = document.getElementById('get_contact_last_name_input');
	const get_contact_data_p = document.getElementById('get_contact_data_p');

	// Server Endpoints
	const serverEndpointGETurl = 'http://169.51.194.167:30422/HelloCloudDemoProject/demo/database/retrieve';
	const serverEndpointPOSTurl = 'https://169.51.194.167:30565/HelloCloudDemoProject/demo/database/store/document';

	// https://169.51.194.167:30565/HelloCloudDemoProject/demo/database/retrieve/randomEmail@123.ca
	// https://169.51.194.167:30565/HelloCloudDemoProject/demo/database/store/document


	// Add contact form submit listener
	add_contact_form.addEventListener('submit', (event) => {
		event.preventDefault(); // Do not execute the default event handling, since we want our custom HTTP request handling
		addContact();
	});

	// Get contact form submit listener
	get_contact_form.addEventListener('submit', (event) => {
		event.preventDefault(); // Do not execute the default event handling, since we want our custom HTTP request handling
		getContact();
	});
});