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
