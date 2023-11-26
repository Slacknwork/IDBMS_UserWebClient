const getRoomById = async (roomId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Rooms/${roomId}`,
            { cache: 'no-store' }
        );
        const room = await response.json();
        return room;
    } catch (error) {
        console.error('Error fetching room by ID:', error);
        throw error;
    }
};
export { getRoomById };