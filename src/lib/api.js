import axios from 'axios';

import Tabletop from 'tabletop';

import config from 'config';

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

export async function getSourceAfricaDominionData(
  projectId = '462-Dominion-AFRICA'
) {
  return axios.get(
    `https://corsanywhere.devops.codeforafrica.org/https://dc.sourceafrica.net/api/search.json?q=projectid:${projectId}`
  );
}

export async function getOpenAfricaDominionGroupData(group = 'dominion') {
  return axios.get(
    `https://corsanywhere.devops.codeforafrica.org/https://open.africa/api/3/action/group_package_show?id=${group}`
  );
}

export async function getOpenAfricaDominionCount(group = 'dominion') {
  return axios.get(
    `https://corsanywhere.devops.codeforafrica.org/https://open.africa/api/3/action/group_show?id=${group}`
  );
}

export async function getShowcaseStories(countrySlug) {
  const {
    showcase: { url, storyFormat }
  } = config;
  return Tabletop.init({
    key: url,
    simpleSheet: true
  }).then(showcaseStories => {
    if (countrySlug) {
      return showcaseStories.filter(
        story => story[storyFormat.country.slug] === countrySlug
      );
    }
    return showcaseStories;
  });
}
