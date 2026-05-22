const API_BASE_URL = 'http://localhost:8000/api';

export const fetchMonuments = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/monuments`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Failed to fetch monuments:", error);
        return [];
    }
};
