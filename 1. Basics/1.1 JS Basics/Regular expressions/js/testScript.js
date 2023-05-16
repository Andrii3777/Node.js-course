let product1 = new Product("2", "b", "Product FootDescription", 140, "Brand", ["S", "M", "L"], "M", 10, "2022-01-01 12:00:00", {}, [1, 2, 3]);
let product2 = new Product("3", "c", "Product Description", 110, "Brand", ["S", "M", "L"], "M", 10, "2022-01-01 12:00:00", {}, [1, 2, 3]);
let product3 = new Product("1", "a", "Product Description", 10, "Brand", ["S", "M", "L"], "M", 10, "2022-01-01 12:00:00", {}, [1, 2, 3]);

let rating1 = new Rating(1, 2, 3, 4);
let rating2 = new Rating(5, 6, 7, 8);

let symbol = Symbol(2);
let review1 = new Review(product1.getID, "John Doe", "2022-01-02 12:00:00", "Good product", rating1);
let review2 = new Review(symbol, "Tom", "2022-01-02 12:00:00", "Good product", rating2);
product1.setReviews([review1, review2, review1]);

// Test getReviewByID()
console.log("Test getReviewByID()");

console.log(product1.getReviewByID(symbol));

// Test getImage()
console.log("Test getImage()");
console.log(product1.getImage(1));
console.log(product1.getImage());

// Test addSize()
console.log("Test addSize()");
product1.addSize('XXL');
console.log(product1.getSizes());

// Test deleteSize()
console.log("Test deleteSize()");
product1.deleteSize(1);
console.log(product1.getSizes());

// // Test addReview()
console.log("Test addReview()");
product1.addReview(review2);
console.log(product1.getReviews());

// Test deleteReview()
console.log("Test deleteReview()");
product1.deleteReview(0);
console.log(product1.getReviews());

// Test getAverageRating()
console.log("Test getAverageRating()");
console.log(product1.getAverageRating());

// Test searchProducts()
console.log("Test searchProducts()");
console.log(searchProducts([product1, product2, product3], "foot"));

// Test sortProducts()
console.log("Test sortProducts()");
console.log(sortProducts([product1, product2, product3], "name"));