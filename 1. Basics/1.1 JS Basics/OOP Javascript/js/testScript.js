let c1 = new Clothes("2", "c1", "A", 37, "Brand", ["S", "M", "L"], "M", 10, "2022-01-01 12:00:00", {}, [1, 2, 3], "Coton", "Black");
let c2 = new Clothes("3", "c1", "C", 137, "Brand", ["S", "M", "L"], "M", 10, "2022-01-01 12:00:00", {}, [1, 2, 3], "Coton", "Black");
let c3 = new Clothes("1", "c1", "B", 7, "Brand", ["S", "M", "L"], "M", 10, "2022-01-01 12:00:00", {}, [1, 2, 3], "Coton", "Black");
let e = new Electronics("1", "c1", "B", 7, "Brand", ["S", "M", "L"], "M", 10, "2022-01-01 12:00:00", {}, [1, 2, 3], 100, 200);

let rating1 = new Rating(1, 2, 3, 4);
let rating2 = new Rating(5, 6, 7, 8);

let symbol = Symbol(2);
let review1 = new Review(c1.getID(), "John Doe", "2022-01-02 12:00:00", "Good product", rating1);
let review2 = new Review(symbol, "Tom", "2022-01-02 12:00:00", "Good product", rating2);
c1.setReviews([review1, review2, review1]);

// Test getReviewByID()
console.log("Test getReviewByID()");
console.log(c1.getReviewByID(symbol));

// Test getImage()
console.log("Test getImage()");
console.log(c1.getImage(1));
console.log(c1.getImage());

// Test addSize()
console.log("Test addSize()");
c1.addSize('XXL');
console.log(c1.getSizes());

// Test deleteSize()
console.log("Test deleteSize()");
c1.deleteSize(1);
console.log(c1.getSizes());

// // Test addReview()
console.log("Test addReview()");
c1.addReview(review2);
console.log(c1.getReviews());

// Test deleteReview()
console.log("Test deleteReview()");
c1.deleteReview(0);
console.log(c1.getReviews());

// Test getAverageRating()
console.log("Test getAverageRating()");
console.log(c1.getAverageRating());

// Test searchProducts()
console.log("Test searchProducts()");
console.log(searchProducts([c1, c2, c3], "A"));

// Test sortProducts()
console.log("Test sortProducts()");
console.log(sortProducts([c1, c2, c3], "price"));

// Test getFullInformation()
console.log("Test getFullInformation()");
console.log(c1.getFullInformation());
console.log(e.getFullInformation());

// Test getPriceForQuantity()
console.log("Test getPriceForQuantity()");
console.log(c1.getPriceForQuantity(45));