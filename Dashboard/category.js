// استرجاع المنتجات من localStorage
const products = JSON.parse(localStorage.getItem("products")) || [];

// الحصول على الجدول الخاص بالمنتجات
const productsTable = document.querySelector("#product-table tbody");

// دالة لعرض المنتجات في الجدول
function displayProducts() {
    productsTable.innerHTML = ""; // مسح محتويات الجدول

    products.forEach(product => {
        const row = productsTable.insertRow();
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.colors}</td>
            <td>${product.quantity}</td>
            <td><img src="${product.imageUrl}" alt="${product.name}" width="50"></td>
        `;
    });
}

// عرض المنتجات عند تحميل الصفحة
displayProducts();
