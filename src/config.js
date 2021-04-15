const GRAPHQL_ORIGIN = 'https://graphql.hurumap.org';

const config = {
  url: 'https://dominion.africa',
  graphqlOrigin: GRAPHQL_ORIGIN,
  graphqlURI: `${GRAPHQL_ORIGIN}/graphql`,
  MAPIT: {
    url: 'https://mapit.hurumap.org',
    codeType: 'AFR'
  },
  robots: {
    devHosts: ['dev.dominion.africa', 'now.sh'],
    dev: `
User-agent: *
Disallow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /
    `,
    prod: `
User-agent: *
Disallow:
    `
  },
  countries: {
    'south-africa': {
      code: 'ZA',
      name: 'South Africa',
      centre: [-30, 24],
      zoom: 5,
      slug: 'south-africa',
      geoLevels: {
        country: {
          name: 'Country'
        },
        level1: {
          name: 'Province'
        }
      }
    }
  },
  about: {
    'south-africa': {
      intro: `The question of who owns the land in South Africa, and of the government’s slow progress in land redistribution, is an emotive issue for South Africans. As a result of past racist apartheid land policies, ownership is disproportionately skewed towards whites, and there is a marked gender inequality.`,
      other: `It’s a complex issue made more difficult by the contested and incomplete nature of official land data. Accurate land data is not just vitally important to addressing the inequalities of the past. It’s also crucial to preventing flawed implementations in the process of restitution, and enforcing transparency so as to expose potential corruption.`
    }
  },
  showcase: {
    url:
      'https://docs.google.com/spreadsheets/d/1rM0ckJYyN-zhbEf8hTgcwCXsZVCdy4ISNrfJD0apf4Y/edit?usp=sharing',
    storyFormat: {
      title: 'TITLE',
      brief: 'BRIEF',
      author: 'AUTHOR',
      href: 'LINK',
      date: 'DATE',
      media: {
        href: 'MEDIA LINK',
        type: 'MEDIA TYPE'
      },
      country: {
        slug: 'COUNTRY'
      }
    }
  },
  populationTables: ['allPopulationGroup2016S', 'allPopulationResidence2009S']
};

export default config;
