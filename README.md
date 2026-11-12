# Live Query Filter System

A responsive product search application built with **Node.js, Express.js, HTML, CSS, and JavaScript**. It allows users to search products instantly, filter by category, and navigate through paginated results.

## Features

- **Live Search:** Search products by name and description.
- **Debounced Search:** Reduces unnecessary API requests while typing.
- **Category Filtering:** Filter products based on categories.
- **Pagination:** Browse products page by page.
- **Responsive Design:** Works on desktop and mobile devices.
- **Loading States:** Displays loading feedback while fetching products.
- **REST API:** Backend API built using Express.js.
- **Product Dataset:** Includes 250 sample products.

## Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js
- CORS

**Tools**
- VS Code
- Git
- GitHub

## Project Structure

```text
live-query-filter-system/
│
├── data/
│   └── catalog.json
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── generate-data.js
├── server.js
├── package.json
├── package-lock.json
└── .gitignore
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/durgadevid500/live-query-filter-system.git
```

### 2. Navigate to the project folder

```bash
cd live-query-filter-system
```

### 3. Install dependencies

```bash
npm install
```

### 4. Generate sample product data (optional)

```bash
node generate-data.js
```

### 5. Start the server

```bash
node server.js
```

### 6. Open in browser

```text
http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check server status |
| GET | `/api/categories` | Get all categories |
| GET | `/api/products` | Search and filter products |
| GET | `/api/catalog/download` | Download product catalog |

### Query Parameters

The products API supports:

- `search` – Search products by name or description.
- `category` – Filter products by category.
- `page` – Select the page number.
- `limit` – Set the number of products per page.

**Example:**

```text
/api/products?search=laptop&category=Technology&page=1&limit=9
```

## How It Works

1. The frontend sends requests to the Express backend.
2. The backend searches and filters the product dataset.
3. Matching products are returned as JSON.
4. JavaScript dynamically displays the results.
5. Pagination allows users to navigate through the results.

## Future Improvements

- Add product images.
- Add price range filtering.
- Integrate a database such as MongoDB or MySQL.
- Add user authentication.
- Deploy the application online.

## Author

**Durga Devi**

GitHub: [@durgadevid500](https://github.com/durgadevid500)
