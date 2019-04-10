import { StyleSheet } from '@patternfly/react-styles';
import {
  c_background_image_BackgroundColor,
  global_Color_light_200,
  global_disabled_color_100,
  global_disabled_color_200,
  global_FontFamily_sans_serif,
  global_FontSize_md,
  global_spacer_lg,
  global_spacer_sm,
} from '@patternfly/react-tokens';
import { VictoryStyleInterface } from 'victory';

export const chartStyles = {
  currentCostData: {
    data: {
      fill: 'none',
      stroke: '#A2DA9C',
    },
  } as VictoryStyleInterface,
  currentInfrastructureCostData: {
    data: {
      fill: 'none',
      stroke: '#88D080',
      strokeDasharray: '3,3',
    },
  } as VictoryStyleInterface,
  legend: {
    labels: {
      fontFamily: global_FontFamily_sans_serif.value,
      fontSize: 14,
    },
    minWidth: 200,
  },
  previousCostData: {
    data: {
      fill: 'none',
      stroke: global_disabled_color_200.value,
    },
  } as VictoryStyleInterface,
  previousInfrastructureCostData: {
    data: {
      fill: 'none',
      stroke: global_disabled_color_200.value,
      strokeDasharray: '3,3',
    },
  } as VictoryStyleInterface,
  // See: https://github.com/project-koku/koku-ui/issues/241
  currentColorScale: ['#A2DA9C', '#88D080', '#6EC664', '#519149', '#3C6C37'],
  // TBD: No grey scale, yet
  previousColorScale: [
    global_disabled_color_200.value,
    global_disabled_color_100.value,
  ],
  tooltip: {
    flyoutStyle: {
      fill: c_background_image_BackgroundColor.value,
      strokeWidth: 0,
    },
    style: {
      fill: global_Color_light_200.value,
      padding: 18,
    },
  },
  yAxis: {
    axisLabel: {
      padding: 15,
    },
    grid: {
      stroke: 'none',
    },
    ticks: {
      stroke: 'none',
    },
    tickLabels: {
      fontSize: 0,
    },
  } as VictoryStyleInterface,
  xAxis: {
    axisLabel: {
      padding: 15,
    },
    grid: {
      stroke: 'none',
    },
    ticks: {
      stroke: 'none',
    },
  } as VictoryStyleInterface,
};

export const styles = StyleSheet.create({
  chartContainer: {
    ':not(foo) svg': {
      overflow: 'visible',
    },
    marginTop: global_spacer_lg.value,
  },
  legendTitle: {
    fontSize: global_FontSize_md.value,
    marginBottom: global_spacer_sm.value,
    marginTop: global_spacer_lg.value,
  },
  legend: {
    display: 'inline-block',
    fontSize: global_FontSize_md.value,
    minHeight: '60px',
    minWidth: '200px',
    width: '50%',
  },
});
