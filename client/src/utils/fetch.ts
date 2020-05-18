export const fetchWrapper = async (
	url: string,
	method: string,
	data: object
): Promise<any> => {
	const response = await fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	return response.json()
}
