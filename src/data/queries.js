// A file that defines needed graphql queries
import gql from 'graphql-tag';

export const GET_PROFILE = gql`
  query profile($geoCode: String!, $geoLevel: String!) {
    geo: wazimapGeographyByGeoLevelAndGeoCodeAndVersion(
      geoLevel: $geoLevel
      geoCode: $geoCode
      version: "2009"
    ) {
      geoLevel
      geoCode
      squareKms
      parentLevel
      parentCode
      longName
      name
    }
    populationGroup: allPopulationGroup2016S(
      condition: { geoCode: $geoCode, geoLevel: $geoLevel }
    ) {
      nodes {
        total
      }
    }
    populationResidence: allPopulationResidence2009S(
      condition: { geoCode: $geoCode, geoLevel: $geoLevel }
    ) {
      nodes {
        total
      }
    }
  }
`;

export const buildVisualsQuery = (visuals, parent) => gql`
query charts($geoCode: String!, $geoLevel: String!) {
  ${visuals
    .map(
      visual => `${visual.id}: ${visual.table} (
    condition: { geoCode: $geoCode, geoLevel: $geoLevel }
  ) {
    nodes {
      ${
        visual.label && visual.label[0] === '$'
          ? `label: ${visual.label.slice(1)}`
          : ''
      }
      ${visual.groupBy ? `groupBy: ${visual.groupBy}` : ''}
      x: ${visual.x}
      y: ${visual.y}
    }
  }
  ${
    visual.reference
      ? `${visual.id}Reference: ${visual.reference.table || visual.table} (
    condition: ${JSON.stringify(
      visual.reference.condition || {
        geoLevel: parent.geoLevel,
        geoCode: parent.geoCode
      }
    ).replace(/"([^(")"]+)":/g, '$1:')}
  ) {
    nodes {
      ${
        (visual.reference.label || visual.label) &&
        (visual.reference.label || visual.label)[0] === '$'
          ? `label: ${(visual.reference.label || visual.label).slice(1)}`
          : ''
      }
      x: ${visual.reference.x || visual.x}
      y: ${visual.reference.y || visual.y}
    }
  }`
      : ''
  }
  `
    )
    .join('')}
}
`;
