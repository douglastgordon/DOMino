/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	
	  constructor(HTMLelements){
	    this.elements = HTMLelements;
	  }
	
	  html(content) {
	    if (content){ // sets innerHTML of each element if content provided
	      this.elements.forEach( (element) => {
	      element.innerHTML = content;
	      });
	    } else { // gets innerHTML of first element if no content provided
	      return this.elements[0].innerHTML;
	    }
	  }
	
	  // sets innerHTML of every element to empty string
	  empty() {
	    this.html("");
	  }
	
	  // appends string, HTMLElement or each element of a DOMNodeCollection
	  // to each element of the current DOMNodeCollection
	  append(content){
	    switch (typeof(content)){
	      case "string":
	        this.elements.forEach ( (element) => {
	          element.innerHTML += content;
	        });
	      case "object":
	        if (!(content instanceof DOMNodeCollection )){
	          content = new DOMNodeCollection(content);
	        }
	        content.elements.forEach( (elementToAppend) => {
	          this.elements.forEach( (element) => {
	            element.innerHTML += elementToAppend.outerHTML;
	          });
	        });
	    }
	  }
	
	  // gets and sets HTML attributes
	  attr(name, value){
	    if (value){
	      this.elements.forEach( (element) => {
	        return element.setAttribute(name, value);
	      });
	    } else {
	      this.elements.forEach( (element) => {
	       return element.getAttribute(name);
	     });
	    }
	  }
	
	  // add or remove classes from each element of DOMNodeCollection
	  addClass(className){
	    this.elements.forEach( (element) => {
	      element.classList.add(className);
	    });
	  }
	  removeClass(className){
	    this.elements.forEach( (element) => {
	      element.classList.remove(className);
	    });
	  }
	
	  // get immediate children of each element of DOMNodeCollection
	  children() {
	    let allChildren = [];
	    this.elements.forEach( (element) => {
	      let children = element.children;
	      let childrenArray = Array.from(children);
	      allChildren.concat(childrenArray);
	    });
	    return new DOMNodeCollection(allChildren);
	  }
	
	  // get parents of each element of DOMNodeCollection
	  parents(){
	    let allParents = [];
	    this.elements.forEach( (element) => {
	      let parent = element.parentElement;
	      allParents.concat(parent);
	    });
	    return new DOMNodeCollection(allParents);
	  }
	
	  // find elements that match css selector
	  find(selector){
	    let allMatches = [];
	    this.elements.forEach( (element) => {
	      let matches = element.querySelectorAll(selector);
	      allMatches.concat(matches);
	    });
	    return new DOMNodeCollection(allMatches);
	  }
	
	  //remove all elements
	  remove(){
	    this.elements.forEach( (element) => {
	      element.parentNode.removeChild(element);
	    });
	  }
	
	  //adds event listener
	  on(type, callback){
	    this.elements.forEach((el) => {
	      el.addEventListener(type, callback);
	    });
	  }
	
	  //removes event listener
	  off(type, callback){
	    this.elements.forEach((el) => {
	      el.removeEventListener(type, callback);
	    });
	  }
	
	}
	
	export default DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=DOMino.js.map