const featuredCharts = {
  kenya: [],
  'south-africa': [
    {
      title: "People in workers' hostels per population group",
      subtitle: '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      sourceLink: 'http://www.statssa.gov.za/publications/P0318/P03182018.pdf',
      sourceTitle: 'General Household Survey, 2018',
      layout: '1',
      visuals: [
        {
          type: 'pie',
          table: 'allWorkersHostelPopulationGroups',
          label: '',
          x: 'workersHostelPopulationGroup',
          y: 'total',
          aggregate: ':percent',
          customUnit: '%',
          id: 'visual-oSOUhVXyP',
          queryAlias: 'viz0'
        }
      ],
      id: 'chart-jLe6B2KjU',
      queryAlias: 'chart0',
      sectionId: 'section-K-fkSD-f'
    },
    {
      title: "People in workers' hostel per gender",
      subtitle: '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      sourceLink: 'http://www.statssa.gov.za/publications/P0318/P03182018.pdf',
      sourceTitle: 'General Household Survey, 2018',
      visuals: [
        {
          type: 'pie',
          table: 'allWorkersHostelGenders',
          x: 'workersHostelGender',
          y: 'total',
          aggregate: ':percent',
          customUnit: '%',
          id: 'visual-qNhYgZBE',
          queryAlias: 'viz1'
        }
      ],
      id: 'chart-HtZtHlMi',
      queryAlias: 'chart1',
      sectionId: 'section-K-fkSD-f'
    }
  ]
};

export default featuredCharts;
