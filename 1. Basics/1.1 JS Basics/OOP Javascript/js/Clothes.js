/**
 * Child class "Clothes" inherit from the abstract class"AbstractProduct"
 * in prototype style.
 * 
 * @param {String} ID of the сlothes.
 * @param {String} name of the сlothes.
 * @param {String} description of the сlothes.
 * @param {Float} price of the сlothes.
 * @param {String} brand of the сlothes.
 * @param {Array of string} sizes of the сlothes.
 * @param {String} activeSize of the сlothes.
 * @param {Integer} quantity of the сlothes.
 * @param {Date} date of the сlothes.
 * @param {Array of odjects "Review"} reviews of the сlothes.
 * @param {Array of Strings} images of the сlothes.
 * @param {String} material of the сlothes.
 * @param {String} color of the сlothes.
 */
function Clothes(ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images, material, color) {
    AbstractProduct.call(this, ID, name, description, price, brand, quantity, date, reviews, images);

    this.sizes = sizes,
    this.activeSize = activeSize,
    this.material = material,
    this.color = color
}

Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;

Object.assign(Clothes.prototype, {
    getSizes() { return this.sizes },
    setSizes(sizes) { this.sizes = sizes },

    getActiveSize() { return this.activeSize },
    setActiveSize() { this.activeSize = activeSize },

    getMaterial() { return this.material },
    setMaterial(material) { this.material = material },

    getColor() { return this.color },
    setColor(color) { this.color = color },

    addSize(size) { this.sizes.push(size) },
    deleteSize(sizeKey) { this.sizes.splice(sizeKey, 1) }
});