const productList = document.querySelector("#product-shop .product-container");

const renderProduct = () => {
    if (productList) {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((products) => {
                htmls = products.map((product) => {
                    return `
                        <div class="pro">
                            <a href="/pages/product.html">
                                <img src="${product.image}" alt="" />
                                <div class="des">
                                    <span>${product.category}</span>
                                    <h5>${product.title}</h5>
                                    <div class="star">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                                    <h4>${product.price}$</h4>
                                </div>
                                <a href="#" class="icon-cart"
                                    ><i class="fa-solid fa-cart-shopping"></i
                                ></a>
                            </a>
                    </div>
                    `;
                });
                productList.innerHTML = htmls.join("\n");
            });
    }
};

renderProduct();
