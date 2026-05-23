const API_BASE_URL = 'http://localhost:8000/api';

export const fetchMonuments = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/monuments/map`);
        const result = await response.json();
        if (result.status === "success") {
            return result.data;
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch monuments:", error);
        return [];
    }
};

export const getMonumentByUri = async (uri) => {
    try {
        const response = await fetch(`${API_BASE_URL}/monuments/detail?uri=${encodeURIComponent(uri)}`);
        const result = await response.json();
        if (result.status === "success") {
            return result.data;
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch monument detail:", error);
        return null;
    }
};
