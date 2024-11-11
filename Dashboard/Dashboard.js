// Get elements
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");
const productsTable = document.querySelector("#product-table tbody");

// Toggle sidebar
document.getElementById("menu-toggle").addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("sidebar-collapsed");
});

// Initialize products array
let products = JSON.parse(localStorage.getItem("products")) || [];

// Function to display products in the table
function displayProducts() {
    productsTable.innerHTML = "";
    products.forEach((product, index) => {
        const row = productsTable.insertRow();
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.colors}</td>
            <td>${product.quantity}</td>
            <td><img src="${product.imageUrl}" alt="${product.name}" width="50"></td>
            <td><button onclick="removeProduct(${index})">Remove</button></td>
        `;
    });
}

// Function to add a new product
function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const colors = parseInt(document.getElementById("product-colors").value);
    const quantity = parseInt(document.getElementById("product-quantity").value);
    const imageInput = document.getElementById("productImage");

    if (!name || isNaN(price) || isNaN(colors) || isNaN(quantity) || !imageInput.files[0]) {
        alert("Please fill in all fields.");
        return;
    }

    const newProduct = {
        name,
        price,
        colors,
        quantity,
        imageUrl: URL.createObjectURL(imageInput.files[0])
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();

    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-colors").value = "";
    document.getElementById("product-quantity").value = "";
    imageInput.value = "";
}

// Function to remove a product
function removeProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

// Search function
function searchProduct() {
    const filter = document.getElementById("search-input").value.toLowerCase();
    const rows = productsTable.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(filter)) {
                found = true;
                break;
            }
        }

        rows[i].style.display = found ? "" : "none";
    }
}

// Display products on page load
displayProducts();
