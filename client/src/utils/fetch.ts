export const fetchWrapper = async <T>(
	url: string,
	method: string,
	data: object
): Promise<T> => {
	const response = await fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${localStorage.getItem('token')}`
		},
		body: JSON.stringify(data),
	})

	return response.json()
}
