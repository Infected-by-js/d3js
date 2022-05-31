export default (rootName, data) => {
  const result = data.reduce((acc, item) => {
    const category = item.category;
    const newItem = acc[category] ? [...acc[category], item] : [item];

    return { ...acc, [category]: newItem };
  }, {});

  const prepared = Object.entries(result).map(([key, value]) => {
    return { name: key, children: value };
  });

  return { name: rootName, children: prepared };
};
