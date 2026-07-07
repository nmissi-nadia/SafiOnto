const API_BASE_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('safi_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const login = async (username, password) => {
    try {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });
        if (response.ok) {
            const data = await response.json();
            return data.access_token;
        }
        return null;
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
};

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
        if (!response.ok) return null;
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

export const getMonumentNarrative = async (uri) => {
    try {
        const response = await fetch(`${API_BASE_URL}/monuments/narrative?uri=${encodeURIComponent(uri)}`);
        if (!response.ok) return null;
        const data = await response.json();
        return data.narrative;
    } catch (error) {
        console.error("Failed to fetch monument narrative:", error);
        return null;
    }
};

export const createMonument = async (monumentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/monuments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(monumentData)
        });
        if (response.status === 401) {
            localStorage.removeItem('safi_token');
            window.location.href = '/login';
            return null;
        }
        const result = await response.json();
        if (result.status === "success") {
            return result.data;
        }
        return null;
    } catch (error) {
        console.error("Error creating monument:", error);
        return null;
    }
};

export const updateMonument = async (monumentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/monuments/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(monumentData)
        });
        if (response.status === 401) {
            localStorage.removeItem('safi_token');
            window.location.href = '/login';
            return null;
        }
        const result = await response.json();
        if (result.status === "success") {
            return result.data;
        }
        return null;
    } catch (error) {
        console.error("Error updating monument:", error);
        return null;
    }
};

export const deleteMonument = async (uri) => {
    try {
        const response = await fetch(`${API_BASE_URL}/monuments/?uri=${encodeURIComponent(uri)}`, {
            method: 'DELETE',
            headers: {
                ...getAuthHeaders()
            }
        });
        if (response.status === 401) {
            localStorage.removeItem('safi_token');
            window.location.href = '/login';
            return null;
        }
        const result = await response.json();
        return result.status === "success";
    } catch (error) {
        console.error("Error deleting monument:", error);
        return false;
    }
};

export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${API_BASE_URL}/monuments/upload`, {
            method: 'POST',
            headers: {
                ...getAuthHeaders()
            },
            body: formData
        });
        
        if (response.status === 401) {
            localStorage.removeItem('safi_token');
            window.location.href = '/login';
            return null;
        }
        
        const result = await response.json();
        if (result.status === "success") {
            return result.imageUrl;
        }
        return null;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};
