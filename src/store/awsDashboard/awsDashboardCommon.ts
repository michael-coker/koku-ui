import { AwsFilters, AwsQuery, getQuery } from 'api/awsQuery';
import { AwsReportType } from 'api/awsReports';
import { ChartType } from 'components/charts/commonChart/chartUtils';

export const awsDashboardStateKey = 'awsDashboard';
export const awsDashboardDefaultFilters: AwsFilters = {
  time_scope_units: 'month',
  time_scope_value: -1,
  resolution: 'daily',
};
export const awsDashboardTabFilters: AwsFilters = {
  ...awsDashboardDefaultFilters,
  limit: 3,
};

interface ValueFormatOptions {
  fractionDigits?: number;
}

export const enum AwsDashboardTab {
  services = 'services',
  accounts = 'accounts',
  regions = 'regions',
  instanceType = 'instance_type',
}

export interface AwsDashboardWidget {
  id: number;
  /** i18n key for the title. passed { startDate, endDate, month, time } */
  titleKey: string;
  reportType: AwsReportType;
  availableTabs: AwsDashboardTab[];
  currentTab: AwsDashboardTab;
  details: {
    costKey?: string /** i18n label key */;
    formatOptions: ValueFormatOptions;
    showUnits?: boolean;
    usageKey?: string /** i18n label key */;
  };
  filter?: {
    limit?: number;
    product_family?: string;
  };
  isDetailsLink?: boolean;
  isHorizontal?: boolean;
  tabsFilter?: {
    limit?: number;
    product_family?: string;
  };
  trend: {
    titleKey: string;
    type: ChartType;
    formatOptions: ValueFormatOptions;
  };
  topItems: {
    formatOptions: {};
  };
}

export function getGroupByForTab(tab: AwsDashboardTab): AwsQuery['group_by'] {
  switch (tab) {
    case AwsDashboardTab.services:
      return { service: '*' };
    case AwsDashboardTab.accounts:
      return { account: '*' };
    case AwsDashboardTab.regions:
      return { region: '*' };
    case AwsDashboardTab.instanceType:
      return { instance_type: '*' };
    default:
      return {};
  }
}

export function getQueryForWidget(
  filter: AwsFilters = awsDashboardDefaultFilters
) {
  const query: AwsQuery = {
    filter,
  };
  return getQuery(query);
}

export function getQueryForWidgetTabs(
  widget: AwsDashboardWidget,
  filter: AwsFilters = awsDashboardDefaultFilters
) {
  const query: AwsQuery = {
    filter,
    group_by: getGroupByForTab(widget.currentTab),
  };
  return getQuery(query);
}
