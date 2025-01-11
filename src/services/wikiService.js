import axios from 'axios';

const WIKI_API_ENDPOINT = 'https://en.wikipedia.org/w/api.php';

export const getLandmarks = async (bounds) => {
  const centerLat = (bounds.getNorth() + bounds.getSouth()) / 2;
  const centerLng = (bounds.getEast() + bounds.getWest()) / 2;

  const params = {
    action: 'query',
    format: 'json',
    list: 'geosearch',
    gscoord: `${centerLat}|${centerLng}`,
    gsradius: 10000,
    gslimit: 50,
    origin: '*'
  };

  try {
    const response = await axios.get(WIKI_API_ENDPOINT, { params });
    const landmarks = await Promise.all(
      response.data.query.geosearch.map(async (item) => {
        const details = await getLandmarkDetails(item.pageid);
        return {
          id: item.pageid,
          title: item.title,
          latitude: item.lat,
          longitude: item.lon,
          description: details.extract || 'No description available.',
          wikipediaUrl: `https://en.wikipedia.org/?curid=${item.pageid}`
        };
      })
    );
    return landmarks;
  } catch (error) {
    console.error('Error fetching landmarks:', error);
    return [];
  }
};

const getLandmarkDetails = async (pageId) => {
  const params = {
    action: 'query',
    format: 'json',
    prop: 'extracts',
    pageids: pageId,
    exintro: true,
    explaintext: true,
    origin: '*'
  };

  try {
    const response = await axios.get(WIKI_API_ENDPOINT, { params });
    return response.data.query.pages[pageId];
  } catch (error) {
    console.error('Error fetching landmark details:', error);
    return { extract: 'No description available.' };
  }
};
