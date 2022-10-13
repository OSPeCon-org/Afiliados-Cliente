export const GET = "[parentesco] GET";
export const GET_SUCCESS = "[parentesco] GET success";
export const GET_ERROR = "[parentesco] GET error";

export const GET_BY_ID = "[parentesco] GET by id";
export const GET_BY_ID_SUCCESS = "[parentesco] GET  by id success";
export const GET_BY_ID_ERROR = "[parentesco] GET  by id error";

export const getAll = () => ({
    type: GET,
});

export const getById = (id) => ({
    type: GET_BY_ID,
    id: id,
});
