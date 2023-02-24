const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const closeNav = document.getElementById("close-nav");
const products = document.querySelectorAll(".product-container .pro");
const backTop = document.querySelector("#backTop");
const html = document.querySelector("html");
const alerts = document.querySelectorAll(".alert");
const productList1 = document.querySelector("#product1 .product-container");
const productList2 = document.querySelector("#product2 .product-container");

if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    });
}

if (closeNav) {
    closeNav.addEventListener("click", () => {
        nav.classList.remove("active");
    });
}

const networkConect = () => {
    alerts.forEach((item) => {
        item.onclick = (event) => {
            if (event.target.classList.contains("close")) {
                item.style.display = "none";
            }
        };
    });

    window.onoffline = () => {
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "flex";
        setTimeout(
            () => (document.getElementById("error").style.display = "none"),
            3500
        );
    };

    window.ononline = () => {
        document.getElementById("error").style.display = "none";
        document.getElementById("success").style.display = "flex";
        setTimeout(
            () => (document.getElementById("success").style.display = "none"),
            3500
        );
    };
};

const handleScroll = () => {
    window.addEventListener("scroll", () => {
        if (html.scrollTop > 600) {
            backTop.classList.add("active");
        } else {
            backTop.classList.remove("active");
        }
    });

    backTop.addEventListener("click", () => {
        html.scrollTop = 0;
    });
};

const renderProduct1 = () => {
    if (productList1) {
        fetch("https://fakestoreapi.com/products?limit=8")
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
                productList1.innerHTML = htmls.join("\n");
            });
    }
};

const renderProduct2 = () => {
    if (productList2) {
        fetch(
            "https://fakestoreapi.com/products/category/women's%20clothing?limit=4"
        )
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
                productList2.innerHTML = htmls.join("\n");
            });
    }
};

function main() {
    handleScroll();
    networkConect();
    renderProduct1();
    renderProduct2();
}

main();
