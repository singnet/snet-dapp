const History = {
  navigate: null,
  location: null,
  push: (page, ...rest) => History.navigate(page, ...rest),
};

export default History;
