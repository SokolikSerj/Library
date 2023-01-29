import $ from "../core";

$.prototype.attr = function(attribute, value) {
    if (!attribute && !value) {
        return this;
    } else if (!value) {
        return this[0].getAttribute(attribute);
    }
    for (let i = 0; i < this.length; i++) {
        this[i].setAttribute(attribute, value);
    }

    return this;
};

$.prototype.removeAttr = function(attribute) {
    if (!attribute) {
        return this;
    }
    for (let i = 0; i < this.length; i++) {
        this[i].removeAttribute(attribute);
    }

    return this;
};