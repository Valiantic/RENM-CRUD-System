-- TABLE FOR PRODUCTS 

CREATE TABLE tbl_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255)
);



-- TABLE FOR ADDED PRODUCT BY CUSTOMERS 

CREATE TABLE tbl_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES tbl_users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES tbl_products(id) ON DELETE CASCADE
);