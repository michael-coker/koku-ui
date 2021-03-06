import { parse, stringify } from 'qs';

export interface OcpFilters {
  limit?: number;
  offset?: number;
  product_family?: string;
  project?: string | number;
  resolution?: 'daily' | 'monthly';
  time_scope_units?: 'month' | 'day';
  time_scope_value?: number;
}

type OcpGroupByValue = string | string[];

interface OcpGroupBys {
  cluster?: OcpGroupByValue;
  node?: OcpGroupByValue;
  project?: OcpGroupByValue;
}

interface OcpOrderBys {
  cost?: string;
  cluster?: string;
  node?: string;
  project?: string;
}

export interface OcpQuery {
  delta?: string;
  filter?: OcpFilters;
  group_by?: OcpGroupBys;
  order_by?: OcpOrderBys;
  key_only?: boolean;
}

const groupByAnd = 'and:';

// Adds logical AND to group_by -- https://github.com/project-koku/koku-ui/issues/704
export function getGroupByAnd(query: OcpQuery) {
  if (!(query && query.group_by)) {
    return query;
  }
  const newQuery = {
    ...JSON.parse(JSON.stringify(query)),
    group_by: {},
  };
  for (const key of Object.keys(query.group_by)) {
    if (query.group_by[key] === '*') {
      newQuery.group_by[key] = query.group_by[key];
    } else {
      newQuery.group_by[`${groupByAnd}${key}`] = query.group_by[key];
    }
  }
  return newQuery;
}

export function getQuery(query: OcpQuery) {
  const newQuery = getGroupByAnd(query);
  return stringify(newQuery, { encode: false, indices: false });
}

// Removes logical AND from group_by -- https://github.com/project-koku/koku-ui/issues/704
export function parseGroupByAnd(query: OcpQuery) {
  if (!(query && query.group_by)) {
    return query;
  }
  const newQuery = {
    ...JSON.parse(JSON.stringify(query)),
    group_by: {},
  };
  for (const key of Object.keys(query.group_by)) {
    const index = key.indexOf(groupByAnd);
    const groupByKey =
      index !== -1 ? key.substring(index + groupByAnd.length) : key;
    newQuery.group_by[groupByKey] = query.group_by[key];
  }
  return newQuery;
}

export function parseQuery<T = any>(query: string): T {
  const newQuery = parse(query, { ignoreQueryPrefix: true });
  return parseGroupByAnd(newQuery);
}
