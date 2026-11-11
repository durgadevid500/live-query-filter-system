
const fs = require("fs");

const categories = [
    "Technology", "Home", "Books", "Sports",
    "Fashion", "Food", "Health", "Travel"
];

const names = [
    "Smart Watch", "Wireless Headphones",
    "Laptop Stand", "Water Bottle",
    "Notebook", "Backpack", "Desk Lamp",
    "Bluetooth Speaker", "Running Shoes",
    "Travel Bag"
];

const descriptions = [
    "Modern design with excellent quality.",
    "Perfect for everyday use.",
    "Lightweight and easy to carry.",
    "Durable product with premium features.",
    "Affordable and reliable choice."
];

const products = [];

for (let i = 1; i <= 250; i++) {
    products.push({
        id: i,
        name: names[(i - 1) % names.length] + " " + i,
        category: categories[(i - 1) % categories.length],
        description: descriptions[(i - 1) % descriptions.length],
        price: Number((Math.random() * 200 + 10).toFixed(2))
    });
}

fs.writeFileSync(
    "data/catalog.json",
    JSON.stringify(products, null, 2)
);

console.log("250 products generated successfully!");
