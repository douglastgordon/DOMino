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
