
const express = require("express");
const cors = require("cors");
const path = require("path");
const catalog = require("./data/catalog.json");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Get categories
app.get("/api/categories", (req, res) => {
    const categories = [
        "All",
        ...new Set(catalog.map(item => item.category))
    ];

    res.json(categories);
});

// Search, filter and pagination API
app.get("/api/products", (req, res) => {
    const search = (req.query.search || "").toLowerCase();
    const category = req.query.category || "All";

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 9));

    let filtered = catalog.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search);

        const matchesCategory =
            category === "All" || item.category === category;

        return matchesSearch && matchesCategory;
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    res.json({
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages
        }
    });
});

// Download catalog
app.get("/api/catalog/download", (req, res) => {
    res.download(
        path.join(__dirname, "data", "catalog.json"),
        "search-catalog.json"
    );
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "Server running successfully" });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on http://localhost:5000");
});
