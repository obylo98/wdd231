// tripAdvisorAPI.js
export async function searchLocations(apiKey= "274A43957F2949F5B8F50EB4357AE6BF", query, category = '', radius = 50, latLong = '', offset = 0, filterQuery = '') {
    const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${query}&category=${category}&radius=${radius}&latLong=${latLong}&offset=${offset}${filterQuery}`;
    try {
        const response = await fetch(url, { headers: { accept: 'application/json' } });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        return null;
    }
}
