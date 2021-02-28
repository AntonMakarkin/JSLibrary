import $ from '../core';

$.prototype.html = function(content) { //rewrite innerHTML
    for (let i = 0; i < this.length; i++) {
        if (content) {
            this[i].innerHTML = content;
        } else {
            return this[i].innerHTML;
        }
    }

    return this;
};

$.prototype.eq = function(i) { //get one element
    const swap = this[i],
          objLength = Object.keys(this).length;

    for (let i = 0; i < objLength; i++) {
        delete this[i];
    }

    this[0] = swap;
    this.length = 1;
    return this; //return our object with the same functions
};

$.prototype.index = function() { //find an index of elements
    const parent = this[0].parentNode,
          children = [...parent.children]; //we transform the pseudo-array in array

    const findMyIndex = (item) => { //filter-function
        return item == this[0];
    };

    return children.findIndex(findMyIndex);
};

$.prototype.find = function(selector) {
    let numOfItems = 0,
        counter = 0;

    const copyObj = Object.assign({}, this); //non-deep copy of this object

    for (let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].querySelectorAll(selector); //trying to find elements
        if (arr.length == 0) {
            continue;
        }

        for (let j = 0; j < arr.length; j++) { //and write them in this object
            this[counter] = arr[j];
            counter++;
        }

        numOfItems += arr.length;
    }

    this.length = numOfItems;

    const objLength = Object.keys(this).length; //cut unnecessary items from this object  
    for (; numOfItems < objLength; numOfItems++) {
        delete this[numOfItems];
    }

    return this;
};

$.prototype.closest = function(selector) { //find a parent
    let counter = 0;
    
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i].closest(selector);
        counter++;
    }

    const objLength = Object.keys(this).length; //cut unnecessary items from this object  
    for (; counter < objLength; counter++) {
        delete this[counter];
    }

    return this;
};

$.prototype.siblings = function() { //find siblings
    let numOfItems = 0,
        counter = 0;

    const copyObj = Object.assign({}, this); //non-deep copy of this object

    for (let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].parentNode.children; //trying to find elements

        for (let j = 0; j < arr.length; j++) { //and write them in this object
            if (copyObj[i] === arr[j]) { //dont write the target elem in this object
                continue;
            }

            this[counter] = arr[j];
            counter++;
        }

        numOfItems += arr.length - 1; //array without the target elem
    }

    this.length = numOfItems;

    const objLength = Object.keys(this).length; //cut unnecessary items from this object  
    for (; numOfItems < objLength; numOfItems++) {
        delete this[numOfItems];
    }

    return this;
};