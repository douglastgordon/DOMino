# DOMino

**DOMino** is a lightweight JavaScript DOM manipulation library. DOMino can be used to dynamically manipulate HTML elements by getting, setting and removing classes, attributes, event listeners and more. Also use it to simplify AJAX requests.

The code snippet below shows how the messy job of appending an object or string to single or multiple HTML elements is conveniently packed into a single method:

```
//JavaScript

append(content) {
  if (this.elements.length === 0) return;
  switch(typeof(content)) {
    case "object":
      if (!(content instanceof DOMNodeCollection)) {
        content = $l(content);
      }
      this.elements.forEach( (element) => {
        content.elements.forEach(childNode => {
          element.appendChild(childNode.cloneNode(true));
        });
      });
    case "string":
      this.elements.forEach( (element) => element.innerHTML += content);
  }
}

```
