export default (rootName, data, sortValue = "category") => {
  const result = {};

  for (const item of data) {
    const name = item[sortValue];

    if (!result[name]) {
      result[name] = { name, children: [item] };
    } else {
      const newChildren = [...result[name].children, item];

      result[name] = { name, children: newChildren };
    }
  }

  const children = Object.values(result);

  return { name: rootName, children };
};
