export const GET = "[planes] GET";
export const GET_SUCCESS = "[planes] GET success";
export const GET_ERROR = "[planes] GET error";

export const GET_BY_ID = "[planes] GET by id";
export const GET_BY_ID_SUCCESS = "[planes] GET  by id success";
export const GET_BY_ID_ERROR = "[planes] GET  by id error";

export const getAll = () => ({
    type: GET,
});

export const getById = (id) => ({
    type: GET_BY_ID,
    id: id,
});
