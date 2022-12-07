const url = "https://pozitiv.uni-studio.ru";

export async function fetchFunc(urlMethod, body) {
    const requestOptions = {
        method: "POST",
        credentials: "include",
        body,
    };

    try {
        const res = await fetch(`${url}${urlMethod}`, requestOptions);
        const result = await res.json();

        return result;
    } catch (error) {
        throw new Error("error", error);
    }
}
