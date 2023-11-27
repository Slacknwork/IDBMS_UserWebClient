const API_BASE_URL = 'https://localhost:7062/api/Authentication';

const registerUser = async (request) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

const loginUser = async (request) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

const updatePassword = async (request) => {
    try {
        const response = await fetch(`${API_BASE_URL}/update-password/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Password update failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

const logoutUser = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email),
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        return true;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

const verifyUser = async (request) => {
    try {
        const response = await fetch(`${API_BASE_URL}/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Verification failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error verifying user:', error);
        throw error;
    }
};

const resetPassword = async (request) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Password reset failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};

export {
    registerUser,
    loginUser,
    updatePassword,
    logoutUser,
    verifyUser,
    resetPassword,
};
