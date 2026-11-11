
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const productContainer = document.getElementById("productContainer");
const resultCount = document.getElementById("resultCount");
const loading = document.getElementById("loading");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let currentPage = 1;
let totalPages = 1;
let debounceTimer;

// Load categories
async function loadCategories() {
    try {
        const response = await fetch("/api/categories");
        const categories = await response.json();

        categoryFilter.innerHTML = "";

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    } catch (error) {
        console.error("Category loading failed:", error);
    }
}

// Fetch products
async function loadProducts() {
    loading.classList.remove("hidden");
    productContainer.innerHTML = "";

    const search = searchInput.value;
    const category = categoryFilter.value;

    try {
        const params = new URLSearchParams({
            search,
            category,
            page: currentPage,
            limit: 9
        });

        const response = await fetch(`/api/products?${params}`);
        const result = await response.json();

        displayProducts(result.data);

        totalPages = result.pagination.totalPages;
        resultCount.textContent =
            `${result.pagination.total} products found`;

        pageInfo.textContent =
            `Page ${currentPage} of ${totalPages || 1}`;

        prevBtn.disabled = currentPage <= 1;
        nextBtn.disabled =
            currentPage >= totalPages || totalPages === 0;

    } catch (error) {
        productContainer.innerHTML =
            '<p class="empty">Unable to load products. Please try again.</p>';
        console.error(error);
    } finally {
        loading.classList.add("hidden");
    }
}

// Display products
function displayProducts(products) {
    if (products.length === 0) {
        productContainer.innerHTML =
            '<p class="empty">No products found!</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const category = document.createElement("span");
        category.className = "category";
        category.textContent = product.category;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = `$${product.price}`;

        card.append(title, category, description, price);
        productContainer.appendChild(card);
    });
}

// Debounced search
searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        currentPage = 1;
        loadProducts();
    }, 400);
});

// Category filter
categoryFilter.addEventListener("change", () => {
    currentPage = 1;
    loadProducts();
});

// Pagination
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadProducts();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadProducts();
    }
});

// Initial load
async function initializeApp() {
    await loadCategories();
    await loadProducts();
}

initializeApp();
