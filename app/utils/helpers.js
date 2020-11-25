const getChidObjectives = (data, id) =>
  data.filter(item => item.parent_objective_id === id);
export const getformattedData = data => {
  /* find parent obj & create a formatted array og objs with parent and child relation */
  if (!data) return null;
  const parentObjectives = data.filter(item => item.parent_objective_id === '');
  const formattedDataArr = [];
  parentObjectives.forEach(parentItem => {
    const o = {};
    o.parent = parentItem;
    o.child = getChidObjectives(data, parentItem.id);
    formattedDataArr.push(o);
  });
  return formattedDataArr;
};

export const getCategories = data => {
  /* Return categories */
  if (!data) return data;
  const category = new Set();
  data.forEach(it => {
    category.add(it.category);
  });
  return [...category];
};

export const selectFilteredOkrs = (category, data) =>
  data.filter(okr => {
    const parentCategory = get(okr, 'parent.category', '');
    return category === parentCategory;
  });

export const get = (from, selector, defaultVal) => {
  const value = selector
    .replace(/\[([^[\]]*)\]/g, '.$1.')
    .split('.')
    .filter(t => t !== '')
    .reduce((prev, cur) => prev && prev[cur], from);
  return value === undefined || value === null ? defaultVal : value;
};
