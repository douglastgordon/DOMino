# DOMino

**DOMino** is a lightweight JavaScript DOM manipulation library. DOMino can be used to dynamically manipulate HTML elements by getting, setting and removing classes, attributes, event listeners and more. Also use it to simplify AJAX requests.

The code snippet below shows how the messy job of appending an object or string to single or multiple HTML elements is conveniently packed into a single method:

```javascript

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

## API

To import DOMino:
```javascript
import domino from './DOMino/main.js'
```

Find elements with a selector:
```javascript
domino('h1')
```

Create a DOMino element:
```javascript
domino(<marquee>Watch me go!</marquee>)
```

Run a script after page loads:
```javascript
domino(() => {
  console.log("Howdy!")
});
```

### Class Methods

####Make an ajax request:
```javascript
domino.ajax({
  type: 'GET',
  url: "someurl.com",
  success(data) {
    console.log(data)
  },
  error(){
    console.log(":(")
  }
});
```

### Instance Methods

#### .addClass(newClass)
#### .append(child)
#### .attr(name, value)
#### .children()
#### .empty()
#### .find(selector)
#### .html(content)
#### .parent()
#### .remove()
#### .removeClass(class)

### Event Listeners

#### .on(action, callback)
#### .off(action, callback)
