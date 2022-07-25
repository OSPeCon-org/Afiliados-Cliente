export const GET = "[nacionalidades] GET";

export const GET_SUCCESS = "[nacionalidades] GET success";

export const GET_ERROR = "[nacionalidades] GET error";

export const get = (options) => ({
	type: GET,
	options: options,
});
