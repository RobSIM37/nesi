const currentEnv = "local";

const localUrl = "http://localhost:8025";
const productionUrl = ""; //ToDo: add production Url

export const typeBackground = (bool, type) => {
    return bool ? type[0] === "b" : type[0] !== "b"
}
export const currentUrl = () => {
    return currentEnv === "local" ? localUrl : productionUrl;
}
export const GET = "get";
export const POST = "post";
export const PUT = "put";
export const DELETE = "delete";
export const BACKGROUND_GET = "b_get";
export const BACKGROUND_POST = "b_post";
export const BACKGROUND_PUT = "b_put";
export const BACKGROUND_DELETE = "b_delete";