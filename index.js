window.addEventListener('load', () => {
	async function addContact() {
		const data = {
			"payload": "hello this is a test payload",
			"random_number": 823472984,
			"location": "Sharon's living room",
			"email": "hello@email.mail"
		};
		// data will get replaced with simple first name, last name, email from the form
		const response = await submitPOSTRequest(data);
	}

	async function getContact() {
		// const url_search_params = new URLSearchParams({
		// 	// data will get replaced with simple first name, last name from the form
		// });
		// const response = await submitHTTPRequest(serverEndpointGETurl + '?' + url_search_params);
		const response = await submitGETRequest(serverEndpointGETurl + 'randomEmail@123.ca');

		get_contact_data_p.innerText = response;
		// get_contact_data_p.innerText = 'Sam Cloud\nsamcloud@cloudready.app';
	}

	async function submitGETRequest(url = '') {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow'
		});

		return response.json();
	}

	async function submitPOSTRequest(requestBody = {}) {
		const response = await fetch(serverEndpointPOSTurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			body: JSON.stringify(requestBody)
		});

		return response.json();
	}

	const add_contact_form = document.getElementById('add_contact_form');
	const get_contact_form = document.getElementById('get_contact_form');
	const get_contact_data_p = document.getElementById('get_contact_data_p');

	const serverEndpointGETurl = 'http://169.51.194.167:31074/HelloCloudDemoProject/demo/database/retrieve/';
	const serverEndpointPOSTurl = 'http://169.51.194.167:31074/HelloCloudDemoProject/demo/database/store/document';

	// http://169.51.194.167:31074/HelloCloudDemoProject/demo/database/retrieve/randomEmail@123.ca
	// http://169.51.194.167:31074/HelloCloudDemoProject/demo/database/store/document

	add_contact_form.addEventListener('submit', (event) => {
		event.preventDefault(); // Do not execute the default event handling, since we want our custom HTTP request handling
		addContact();
	});

	get_contact_form.addEventListener('submit', (event) => {
		event.preventDefault(); // Do not execute the default event handling, since we want our custom HTTP request handling
		getContact();
	});
});