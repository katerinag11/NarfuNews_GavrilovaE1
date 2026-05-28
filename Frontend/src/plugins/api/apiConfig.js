const port = import.meta.env.PORT || 3010;

export const API_BASE_URL = `http://localhost:${port}/api`;


export async function fetchData(url, options = {}) {
    try {
    const response = await fetch(url, {
    headers: {
    "Content-Type": "application/json",
    },
    ...options,
    });

    if (!response.ok) {
    throw new Error({
    ...response,
    message: `Ошибка: ${response.status} ${response.statusText}`,
    });
    }

    return await response.json();
    } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
    }
}