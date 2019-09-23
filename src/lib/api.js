import axios from 'axios';
import config from '../config';

export default function createAPI() {
  const { url: mapitUrl, codeType } = config.MAPIT;

  return {
    getGeography: async (countryCode, searchTerm) => {
      const response = await axios.get(
        `${mapitUrl}/areas/${searchTerm}?country=${countryCode}`
      );
      return Object.values(response.data);
    },
    getGeoLevel: async geoId => {
      const response = await axios.get(`${mapitUrl}/code/${codeType}/${geoId}`);
      return response.data.type.toLowerCase();
    },
    getLocation: async ({ coords: { latitude, longitude } }) =>
      axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      )
  };
}

export async function getProfile(geoId) {
  return axios.get(`https://api.hurumap.org/profiles/${geoId}.json/`);
}
export async function getComparisonProfile(geoId, anotherGeoId) {
  return axios.get(
    `https://api.hurumap.org/api/compare/${geoId}/vs/${anotherGeoId}/`
  );
}

export async function getSourceAfricaDominionData() {
  const projectId = '462-Dominion-AFRICA';
  return axios.get(
    `https://dc.sourceafrica.net/api/search.json?q=projectid:${projectId}`
  );
}

export async function getOpenAfricaDominionGroupData() {
  const group = 'dominion';
  return axios.get(
    `https://africaopendata.org/api/3/action/group_package_show?id=${group}`
  );
}
