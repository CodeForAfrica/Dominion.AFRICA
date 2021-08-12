import axios from 'axios';
import Papa from 'papaparse';
import request from 'request';

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

/**
 * .
 * For Papa.parse to work in the node environment, we will have to pipe the
 * stream returned, The Papa.LocalChunkSize, Papa.RemoteChunkSize , download,
 * withCredentials, worker, step, and complete config options are unavailable.
 * To register a callback with the stream to process data, use the data event
 * like so: stream.on('data', callback) and to signal the end of stream, use
 * the 'end' event like so: stream.on('end', callback).
 * src - https://github.com/mholt/PapaParse/blob/master/README.md#papa-parse-for-node
 * @returns {Promise} .
 */
export async function getShowcaseStories(countrySlug) {
  const {
    showcase: { url, storyFormat }
  } = config;

  return new Promise((resolve, reject) => {
    const options = {
      header: true,
      error(err) {
        reject(err);
      }
    };
    const dataStream = request.get(url);
    const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, options);
    dataStream.pipe(parseStream);
    const showcaseStories = [];
    parseStream.on('data', chunk => {
      showcaseStories.push(chunk);
      console.log('BOOM', showcaseStories);
    });

    parseStream.on('finish', () => {
      resolve(
        showcaseStories.filter(
          story => story[storyFormat.country.slug] === countrySlug
        )
      );
    });
  });
}
