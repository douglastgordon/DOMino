const DOMNodeCollection = require('./dom_node_collection');
const _documentReadyFns = [];

window.$l = arg => {
  switch (typeof(arg)) {
    case "string":
      let nodes = document.querySelectorAll(arg);
      let nodeArray = Array.from(nodes);
      return new DOMNodeCollection(nodeArray);
    case "object":
      if (arg instanceof HTMLElement){
        return new DOMNodeCollection([arg]);
      }
    case "function":
      _documentReadyFns.concat(arg);
  }
};

//merges objects
$l.extend
let hello = (object, ...newObjects) => {
  newObjects.forEach((newObject) => {
    let newObjectKeys = Object.keys(newObject);
    newObjectKeys.forEach((key) => {
      object[key] = newObject[key];
    });
  });
  return object;
};

//makes ajax request given options
$l.ajax = options => {
  const request = new XMLHttpRequest();
  const defaultOptions = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $l.extend(defaultOptions, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
    let queryString = "?";
    let dataKeys = Object.keys(options.data);
    dataKeys.forEach((key) => {
      queryString += key + "=" + options.data[key] + "&";
    });
    options.url += queryString.slice(0, queryString.length-1);
  }

  request.open(options.method, options.url);
  request.onload = e => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };
};

document.addEventListener('DOMContentLoaded', () => {
  _documentReadyFns.forEach( (fn) => {
    fn();
  });
});
