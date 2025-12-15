import api from "./service";

export const fetchRatings = async (pageNumber: number) => {
    try {
        const response =  await api.get('&page=' + pageNumber);
        return response.data;
    } catch (error) {
        console.error("Error fetching ratings:", error);
        throw error;
    }
}