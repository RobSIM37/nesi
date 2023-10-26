const currentEnv = "local";

const localUrl = "https://localhost:8025";
const productionUrl = ""; //ToDo: add production Url

export const currentUrl = () => {
    return currentEnv === "local" ? localUrl : productionUrl;
}