export const fetchWrapper = async <T>(
	url: string,
	method: string,
	data?: object,
): Promise<T> => {
	const response = await fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${localStorage.getItem('token')}`
		},
		body: data ? JSON.stringify(data) : undefined,
	})

	// Выбрасывание ошибки в случаях неудачного запроса
	if (response.ok === false) {
		const { message } = await response.json();
		throw new Error(message);
	}

	return response.json()
}
