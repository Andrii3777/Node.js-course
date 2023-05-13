/**
 * "Product" constructor function to create objects with the following properties:
 * 
 * @param {String} ID of the product.
 * @param {String} name of the product.
 * @param {String} description of the product.
 * @param {Float} price of the product.
 * @param {String} brand of the product.
 * @param {Array of string} sizes of the product.
 * @param {String} activeSize of the product.
 * @param {Integer} quantity of the product.
 * @param {Date} date of the product.
 * @param {Array of odjects "Review"} reviews of the product.
 * @param {Array of Strings} images of the product.
 */
function Product(ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images) {
    this.ID = Symbol(ID),
    this.name = name,
    this.description = description,
    this.price = price,
    this.brand = brand,
    this.sizes = sizes,
    this.activeSize = activeSize,
    this.quantity = quantity,
    this.date = new Date(date),
    this.reviews = reviews,
    this.images = images,

    this.getID = () => this.ID,
    this.setID = (ID) => this.ID = Symbol(ID),

    this.getName = () => this.name,
    this.setName = (name) => this.name = name,

    this.getDescription = () => this.description,
    this.setDescription = (description) => this.description = description,

    this.getPrice = () => this.price,
    this.setPrice = (price) => this.price = price,
    
    this.getBrand = () => this.brand,
    this.setBrand = (brand) => this.brand = brand,

    this.getSizes = () => this.sizes,
    this.setSizes = (sizes) => this.sizes = sizes,

    this.getActiveSize = () => this.activeSize,
    this.setActiveSize = (activeSize) => this.activeSize = activeSize,

    this.getQuantity = () => this.quantity,
    this.setQuantity = (quantity) => this.quantity = quantity,

    this.getDate = () => this.date,
    this.setDate = (date) => this.date = new Date(date),

    this.getReviews = () => this.reviews,
    this.setReviews = (reviews) => this.reviews = reviews,

    this.getImages = () => this.images,
    this.setImages = (images) => this.images = images,

    this.getReviewByID = (ID) => this.reviews.find((review) => review.getID() === ID),

    this.getImage = (imageKey) => this.images[imageKey || 0],

    this.addSize = (size) => this.sizes.push(size),
    this.deleteSize = (sizeKey) => this.sizes.splice(sizeKey, 1),

    this.addReview = (review) => this.reviews.push(review),
    this.deleteReview = (reviewKey) => this.reviews.splice(reviewKey, 1)

    this.getAverageRating = () => {
        let ratingSum = 0;
        let ratingCount = 0;
        this.reviews.forEach(review => {
            Object.values(review.rating).forEach(value => {
                ratingSum += value;
                ratingCount++;
                console.log(ratingSum);
            });
        });
        return (ratingSum/ratingCount).toFixed(3);
    }
}

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
    this.quality= quality
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

