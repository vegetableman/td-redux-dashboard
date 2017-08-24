// param id will be used when the backend supports it. it's dummy now.
export const fetchWidget = (id) => {
  return fetch('https://raw.githubusercontent.com/vegetableman/td-redux-dashboard/master/public/data.json');
};

