const base = '/api';

interface SendRequestParams {
	method: string;
	path: string;
	data?: any;
	token?: string;
}

async function send({ method, path, data }: SendRequestParams) {
	const opts: any = { method, headers: {} };

	const storedUser = JSON.parse(localStorage.getItem('companyDashBoardUser'));
	if (storedUser) {
		opts.headers['Authorization'] = `${storedUser.login}:${storedUser.password}`;
	}

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	return fetch(`${base}/${path}`, opts)
		.then((r) => r.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export function get(path) {
	return send({ method: 'GET', path });
}

export function del(path, data?) {
	return send({ method: 'DELETE', path, data });
}

export function post(path, data?) {
	return send({ method: 'POST', path, data });
}

export function put(path, data) {
	return send({ method: 'PUT', path, data });
}
