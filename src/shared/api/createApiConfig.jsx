export const createApiConfig = (method, url, body) => ({
	url,
	method,
	...(body && { body }),
});