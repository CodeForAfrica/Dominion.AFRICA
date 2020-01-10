export default function customChartColorScale(theme, scale) {
  return {
    ...theme,
    chart: {
      ...theme.chart,
      colorScale: scale,
      pie: {
        ...theme.chart.pie,
        colorScale: scale
      },
      area: {
        ...theme.chart.area,
        colorScale: scale
      },
      group: {
        ...theme.chart.group,
        colorScale: scale
      },
      bar: {
        ...theme.chart.bar,
        style: {
          ...theme.chart.bar.style,
          data: {
            ...theme.chart.bar.style.data,
            fill: scale[0]
          }
        }
      }
    }
  };
}
