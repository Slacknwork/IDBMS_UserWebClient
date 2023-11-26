const getFloorById = async (floorId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Floors/${floorId}`,
            { cache: 'no-store' }
        );
        const floor = await response.json();
        return floor;
    } catch (error) {
        console.error('Error fetching floor by ID:', error);
        throw error;
    }
};
export { getFloorById };