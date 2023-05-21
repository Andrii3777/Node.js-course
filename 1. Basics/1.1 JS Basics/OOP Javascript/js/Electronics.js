/**
 * Child class "Electronics" inherit from the abstract class"AbstractProduct"
 * in prototype style.
 * 
 * @param {String} ID of the electronics.
 * @param {String} name of the electronics.
 * @param {String} description of the electronics.
 * @param {Float} price of the electronics.
 * @param {String} brand of the electronics.
 * @param {Array of string} sizes of the electronics.
 * @param {String} activeSize of the electronics.
 * @param {Integer} quantity of the electronics.
 * @param {Date} date of the electronics.
 * @param {Array of odjects "Review"} reviews of the electronics.
 * @param {Array of Strings} images of the electronics.
 * @param {Number} warranty of the electronics.
 * @param {Number} power of the electronics.
 */
function Electronics(ID, name, description, price, brand, quantity, date, reviews, images, warranty, power) {
    AbstractProduct.call(this, ID, name, description, price, brand, quantity, date, reviews, images);

    this.warranty = warranty,
    this.power = power
}

Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;

Object.assign(Electronics.prototype, {
    getWarranty() { return this.warranty },
    setWarranty(warranty) { this.warranty = warranty },

    getPower() { return this.power },
    setPower() { this.power = power }
});
