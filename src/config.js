const config = {
  url: 'https://dev.dominion.africa',
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
    kenya: {
      code: 'KE',
      name: 'Kenya',
      centre: [0.3051933453207569, 37.908818734483155],
      zoom: 6,
      slug: 'kenya',
      geoLevels: {
        country: {
          name: 'Country'
        },
        level1: {
          name: 'County'
        }
      }
    },
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
    kenya: {
      intro: `Land ownership is an emotive and contentious issue in Kenya. The fight for independence was based on the struggle to revert land ownership from the colonialists back to the Africans. Failure to implement recommendations by numerous task forces looking into land tenure, access and distribution means that the land question still remains the single most explosive issue.

        Only 17% of the total land mass in Kenya is arable with the rest mostly arid and semi-arid. An estimated 50% of the arable land is in the hands of 20 per cent of the population with large tracts owned by political families.`,
      other: `Land has been at the core of the ethnic conflicts witnessed in Kenya over the last two decades. The  ambiguous nature of the law and  deliberate moves by the landed class to hamper the implementation of provisions in the 2010 constitution that prevents foreigners from owning land and sets a time limit on foreigners leasing land means that land question will continue to be an issue of concern.

        This skewed ownership of land presents a dire situation in an economy that is still dependent on agriculture. Land, in the form of title deeds, is still the major form of security when seeking credit. Successive political regimes’ use of land  for political patronage has led to the indiscriminate ‘grabbing’ of protected lands such as forests, wetlands, game parks and land set aside for public utilities such as schools, roads and even cemeteries.
        
        Land remains Kenya’s most important natural resource. Land supports and drives Kenya’s largest economic activities: agriculture and mining. Therefore, equitable distribution of land is critical to economic, social, political and cultural development.
        
        Dominion KE sets out to try and break the opacity which surrounds land ownership, distribution, access. It will use data to spotlight discriminatory practises against women, the youth and other marginalised communities and engender nuanced discussions around the multiplicity of issues that are the Land Question in Kenya.`
    },
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
