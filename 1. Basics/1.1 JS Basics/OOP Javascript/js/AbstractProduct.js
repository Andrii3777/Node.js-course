/**
 * Abstract class "AbstractProduct" in prototype style.
 * 
 * @param {String} ID of the product.
 * @param {String} name of the product.
 * @param {String} description of the product.
 * @param {Float} price of the product.
 * @param {String} brand of the product.
 * @param {Integer} quantity of the product.
 * @param {Date} date of the product.
 * @param {Array of odjects "Review"} reviews of the product.
 * @param {Array of Strings} images of the product.

 */
function AbstractProduct(ID, name, description, price, brand, quantity, date, reviews, images) {
    if (this.constructor === AbstractProduct) {
        throw new Error("Instance of Abstract class cannot be instantiated");
    }

    this.ID = Symbol(ID),
    this.name = name,
    this.description = description,
    this.price = price,
    this.brand = brand,
    this.quantity = quantity,
    this.date = new Date(date),
    this.reviews = reviews,
    this.images = images
}

Object.assign(AbstractProduct.prototype, {
    getID() { return this.ID },
    setID() { this.ID = Symbol(ID) },

    getName() { return this.name },
    setName(name) { this.name = name },

    getDescription() { return this.description },
    setDescription(description) { this.description = description },

    getPrice() { return this.price },
    setPrice(price) { this.price = price },

    getBrand() { return this.brand },
    setBrand(brand) { this.brand = brand },

    getQuantity() { return this.quantity },
    setQuantity(quantity) { this.quantity = quantity },

    getDate() { return this.date },
    setDate(date) { this.date = new Date(date) },

    getReviews() { return this.reviews },
    setReviews(reviews) { this.reviews = reviews },

    getImages() { return this.images },
    setImages(images) { this.images = images },

    getReviewByID(ID) { return this.reviews.find((review) => review.getID() === ID) },

    getImage(imageKey) { return this.images[imageKey || 0] },

    addReview(review) { this.reviews.push(review) },
    deleteReview(reviewKey) { this.reviews.splice(reviewKey, 1) },

    getAverageRating() {
        let ratingSum = 0;
        let ratingCount = 0;
        this.reviews.forEach(review => {
            Object.values(review.rating).forEach(value => {
                ratingSum += value;
                ratingCount++;
            });
        });
        return (ratingSum / ratingCount).toFixed(3);
    },

    getProperty(property) { return this[property] },

    setProperty(property, value) { this[property] = value },

    getFullInformation() {
        function iterateProperties(obj) {
            let strFullInformation = '';
    
            for (const key in obj) {
                const prop = obj[key];
    
                if (typeof prop === 'object' && !(prop instanceof Date)) {
                    strFullInformation += `\n${key}:\n` + iterateProperties(prop);
                } else if (typeof prop !== 'function') {
                    strFullInformation += `${key} - ${prop.toString()}\n`;
                }
            }
    
            return strFullInformation;
        }
    
        return iterateProperties(this);
    },

    getPriceForQuantity(numOfProducts) {
        return '$' + (numOfProducts * this.getPrice()).toFixed(2);
    }
});

/**
 * "Review" constructor function to create objects with the following properties:
 * 
 * @param {String} ID of the rewiew.
 * @param {String} author of the rewiew.
 * @param {Date} date of the rewiew.
 * @param {String} comment of the rewiew.
 * @param {Rating} rating of the rewiew.
 */
function Review(ID, author, date, comment, rating) {
    this.ID = ID,
        this.author = author,
        this.date = new Date(date),
        this.comment = comment,
        this.rating = rating,

        this.getID = () => this.ID,
        this.setID = (ID) => this.ID = ID,

        this.getAuthor = () => this.author,
        this.setAuthor = (author) => this.author = author,

        this.getDate = () => this.date = date,
        this.setDate = (date) => this.date = date,

        this.getComment = () => this.comment,
        this.setComment = (comment) => this.comment = comment,

        this.getRating = () => this.rating,
        this.setRating = (rating) => this.rating = rating
}

/**
 * "Rating" constructor function to create objects with the following properties:
 * 
 * @param {Integer} service rating.
 * @param {Integer} price rating.
 * @param {Integer} value rating.
 * @param {Integer} quality rating.
 */
function Rating(service, price, value, quality) {
    this.service = service,
        this.price = price,
        this.value = value,
        this.quality = quality
}

/**
 * The function returns an array of objects
 * that contain search text in the name or description
 * with a possibility of extended search.
 * 
 * @param {Array of objects "Product"} products An array of "Product" objects.
 * @param {String} search A search text.
 * @returns an array of objects that contain
 * search text in the name or description
 * with a possibility of extended search.
 */
function searchProducts(products, search) {
    search = search.toLowerCase();
    return products.filter(product => {
        return product.getName().toLowerCase().includes(search) ||
            product.getDescription().toLowerCase().includes(search);
    });
}

/**
 * The sorting function returns an array of sorted objects.
 * The sortRule parameter allows sorting by 'price', 'name' and 'ID'.
 * 
 * @param {Array of objects "Product"} products An array of "Product" objects.
 * @param {String} sortRule An attribute by which to sort.
 * @returns an array of sorted objects.
 */
function sortProducts(products, sortRule) {
    switch (sortRule.toLowerCase()) {
        case "id":
            return products.sort((p1, p2) => p1.getID().toString().localeCompare(p2.getID().toString()));
        case "name":
            return products.sort((p1, p2) => p1.getName().localeCompare(p2.getName()));
        case "price":
            return products.sort((p1, p2) => p1.getPrice() - p2.getPrice());
        default: return products;
    }
}