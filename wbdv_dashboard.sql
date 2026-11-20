-- =====================================================================
-- CSSP Garments Trading : database schema + starter data
-- Import in phpMyAdmin: create/select an empty database, then Import this file.
-- Tables: users, login_logs, products, cart_items, orders, order_items
-- Engine InnoDB, utf8mb4. Safe to re-import (drops the tables first).
-- =====================================================================
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS login_logs;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- ---------------------------------------------------------------------
-- USERS: accounts shown in the dashboard (User accounts tab)
-- is_hidden = soft delete ("Hide" / "Show hidden"), the row is never removed
-- ---------------------------------------------------------------------
CREATE TABLE users (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name     VARCHAR(120) NOT NULL,
  email         VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone         VARCHAR(30)  DEFAULT NULL,
  role          ENUM('owner','admin','staff','customer') NOT NULL DEFAULT 'customer',
  status        ENUM('active','pending','suspended') NOT NULL DEFAULT 'active',
  is_hidden     TINYINT(1) NOT NULL DEFAULT 0,
  hidden_at     DATETIME DEFAULT NULL,
  last_login_at DATETIME DEFAULT NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_role_status (role, status),
  KEY idx_users_hidden (is_hidden)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- LOGIN_LOGS: one row per sign-in attempt (Login logs tab, Recent sign-ins)
-- user_id is NULL when the email does not match any account
-- ---------------------------------------------------------------------
CREATE TABLE login_logs (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id         INT UNSIGNED DEFAULT NULL,
  email_attempted VARCHAR(190) NOT NULL,
  result          ENUM('success','failed','blocked') NOT NULL,
  fail_reason     VARCHAR(120) DEFAULT NULL,
  ip_address      VARCHAR(45)  DEFAULT NULL,
  user_agent      VARCHAR(255) DEFAULT NULL,
  logged_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_logs_user (user_id),
  KEY idx_logs_time (logged_at),
  KEY idx_logs_result (result),
  CONSTRAINT fk_logs_user FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- PRODUCTS: catalog from products.php (Uniforms and Safety Footwear)
-- price is the base price in PHP; the site converts to USD/EUR on screen
-- ---------------------------------------------------------------------
CREATE TABLE products (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  sku           VARCHAR(20)  NOT NULL,
  name          VARCHAR(150) NOT NULL,
  type          ENUM('Uniforms','Shoes') NOT NULL,
  group_name    VARCHAR(40)  NOT NULL COMMENT 'Maritime, Kitchen, Jackets, Shoes',
  category      VARCHAR(60)  NOT NULL COMMENT 'Label shown on the card',
  price         DECIMAL(10,2) NOT NULL,
  material      VARCHAR(190) DEFAULT NULL,
  badge         ENUM('bestseller','new','sale') DEFAULT NULL,
  image_front   VARCHAR(255) DEFAULT NULL,
  image_back    VARCHAR(255) DEFAULT NULL,
  size_guide_1  VARCHAR(255) DEFAULT NULL,
  size_guide_2  VARCHAR(255) DEFAULT NULL,
  stock_qty     INT UNSIGNED NOT NULL DEFAULT 0,
  is_active     TINYINT(1) NOT NULL DEFAULT 1,
  is_hidden     TINYINT(1) NOT NULL DEFAULT 0,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_sku (sku),
  KEY idx_products_type (type, is_active, is_hidden)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- CART_ITEMS: saved cart per logged-in user (one row per product + size)
-- ---------------------------------------------------------------------
CREATE TABLE cart_items (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id     INT UNSIGNED NOT NULL,
  product_id  INT UNSIGNED NOT NULL,
  size        VARCHAR(10)  NOT NULL DEFAULT 'M',
  quantity    INT UNSIGNED NOT NULL DEFAULT 1,
  added_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cart_line (user_id, product_id, size),
  KEY idx_cart_product (product_id),
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT chk_cart_qty CHECK (quantity > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- ORDERS: one row per checkout / quote request
-- ---------------------------------------------------------------------
CREATE TABLE orders (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_no       VARCHAR(20)  NOT NULL,
  user_id        INT UNSIGNED DEFAULT NULL,
  status         ENUM('pending','confirmed','in_production','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  currency       CHAR(3)      NOT NULL DEFAULT 'PHP',
  subtotal       DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  shipping_fee   DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  total          DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  contact_name   VARCHAR(120) NOT NULL,
  contact_email  VARCHAR(190) NOT NULL,
  contact_phone  VARCHAR(30)  DEFAULT NULL,
  shipping_address TEXT DEFAULT NULL,
  notes          TEXT DEFAULT NULL,
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_orders_no (order_no),
  KEY idx_orders_user (user_id),
  KEY idx_orders_status (status, created_at),
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- ORDER_ITEMS: lines of an order. name and price are copied at purchase
-- time so later catalog edits never change old orders.
-- ---------------------------------------------------------------------
CREATE TABLE order_items (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id      INT UNSIGNED NOT NULL,
  product_id    INT UNSIGNED DEFAULT NULL,
  product_name  VARCHAR(150) NOT NULL,
  size          VARCHAR(10)  NOT NULL DEFAULT 'M',
  unit_price    DECIMAL(10,2) NOT NULL,
  quantity      INT UNSIGNED NOT NULL DEFAULT 1,
  line_total    DECIMAL(12,2) GENERATED ALWAYS AS (unit_price * quantity) STORED,
  PRIMARY KEY (id),
  KEY idx_items_order (order_id),
  KEY idx_items_product (product_id),
  CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_items_product FOREIGN KEY (product_id) REFERENCES products (id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT chk_items_qty CHECK (quantity > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================================
-- STARTER DATA
-- =====================================================================

-- Owner account. Temporary password: ChangeMe123!  (change it after first login)
-- Hash is SHA-512 crypt, which PHP password_verify() accepts.
INSERT INTO users (full_name, email, password_hash, role, status) VALUES
('Owner', 'owner@cssp.local', '$6$LAeDV67OjelnhTHN$yktt9.sSVOF9Ywlys2TujxJ2AOU/rvllxvaRgcevAnDHXFwjel5lKg9DKUuYEpBckKDFSqIeLXx.KSxpSslBu/', 'owner', 'active');

-- Products from products.php (stock set to 50 each, edit in the dashboard)
INSERT INTO products
(sku, name, type, group_name, category, price, material, badge, image_front, image_back, size_guide_1, size_guide_2, stock_qty) VALUES
('UNI-PR1','Coveralls (Royal Blue)','Uniforms','Maritime','Uniforms - Maritime',1000.00,'100% Cotton Twill, Reflectorized Tape','bestseller','Assets/Products/UNI-PR1-Front-Coverall (Blue).png','Assets/Products/UNI-PR1-Back-Coverall (Blue).png','Assets/Products/Modal/SizeGuide-Front and Back-Coverall.png','Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png',50),
('UNI-PR2','Coveralls (Orange)','Uniforms','Maritime','Uniforms - Maritime',1000.00,'100% Cotton Twill, Reflectorized Tape','new','Assets/Products/UNI-PR2-Front-Coverall (Orange).png','Assets/Products/UNI-PR2-Back-Coverall (Orange).png','Assets/Products/Modal/SizeGuide-Front and Back-Coverall.png','Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png',50),
('UNI-PR3','Coveralls (Khaki)','Uniforms','Maritime','Uniforms - Maritime',1000.00,'100% Cotton Twill, Reflectorized Tape','sale','Assets/Products/UNI-PR3-Front-Coverall (Khaki).png','Assets/Products/UNI-PR3-Back-Coverall (Khaki).png','Assets/Products/Modal/SizeGuide-Front and Back-Coverall.png','Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png',50),
('UNI-PR4','Chef''s Polo Long Sleeve (Ver. 1)','Uniforms','Kitchen','Uniforms - Kitchen',800.00,'Poly-Cotton Blend, Breathable Fabric','new','Assets/Products/UNI-PR4-Front-Top1.png','Assets/Products/UNI-PR4-Back-Top1.png','Assets/Products/Modal/SizeGuide-Front and Back-Top (Long Sleeve).png','Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png',50),
('UNI-PR5','Chef''s Polo Long Sleeve (Ver. 2)','Uniforms','Kitchen','Uniforms - Kitchen',950.00,'100% Cotton Twill, Breathable Fabric','new','Assets/Products/UNI-PR5-Front-Top2.png','Assets/Products/UNI-PR5-Back-Top2.png','Assets/Products/Modal/SizeGuide-Front and Back-Top (Long Sleeve).png','Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png',50),
('UNI-PR6','Kitchen Crew Polo','Uniforms','Kitchen','Uniforms - Kitchen',800.00,'Poly-Cotton Blend, Breathable Fabric','bestseller','Assets/Products/UNI-PR6-Front-Top3.png','Assets/Products/UNI-PR6-Back-Top3.png','Assets/Products/Modal/SizeGuide-Front and Back-Top (Short Sleeve).png','Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png',50),
('UNI-PR7','Chef''s Pants','Uniforms','Kitchen','Uniforms - Kitchen',500.00,'Poly-Cotton Blend, Breathable Fabric','sale','Assets/Products/UNI-PR7-Front-Pants1.png','Assets/Products/UNI-PR7-Back-Pants1.png','Assets/Products/Modal/SizeGuide-Front and Back-Pants.png','Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png',50),
('UNI-PR8','Kitchen Crew Checkered Pants','Uniforms','Kitchen','Uniforms - Kitchen',500.00,'Poly-Cotton Blend, Breathable Fabric','bestseller','Assets/Products/UNI-PR8-Front-Pants2.png','Assets/Products/UNI-PR8-Back-Pants2.png','Assets/Products/Modal/SizeGuide-Front and Back-Pants.png','Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png',50),
('UNI-PR9','Winter Jacket','Uniforms','Jackets','Uniforms - Jackets',1500.00,'Polyester Outer Shell, Reflectorized Tape','new','Assets/Products/UNI-PR9-Front-Jacket1.png','Assets/Products/UNI-PR9-Back-Jacket1.png','Assets/Products/Modal/SizeGuide-Front and Back-Jackets.png','Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png',50),
('UNI-PR10','Ordinary Jacket','Uniforms','Jackets','Uniforms - Jackets',1500.00,'Polyester Outer Shell, Reflectorized Tape','new','Assets/Products/UNI-PR10-Front-Jacket2.png','Assets/Products/UNI-PR10-Back-Jacket2.png','Assets/Products/Modal/SizeGuide-Front and Back-Jackets.png','Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png',50),
('SHO-PR1','MG Safety (High Cut)','Shoes','Shoes','PPE - Shoes',1500.00,'Full-grain Leather, Carbon Steel Toe Cap','bestseller','Assets/Products/SHO-PR1-Front-High Cut (MG Safety).png','Assets/Products/SHO-PR1-Back-High Cut (MG Safety).png','Assets/Products/Modal/SizeGuide-Front and Back-Shoes.png','Assets/Products/Modal/SizeGuide-Measurements-Shoes.png',50),
('SHO-PR2','Rockwinner (Low Cut)','Shoes','Shoes','PPE - Shoes',1200.00,'Full-grain Leather, Carbon Steel Toe Cap','new','Assets/Products/SHO-PR2-Front-Low Cut (Rockwinner).png','Assets/Products/SHO-PR2-Back-Low Cut (Rockwinner).png','Assets/Products/Modal/SizeGuide-Front and Back-Shoes.png','Assets/Products/Modal/SizeGuide-Measurements-Shoes.png',50),
('SHO-PR3','MG Safety (Low Cut)','Shoes','Shoes','PPE - Shoes',1200.00,'Full-grain Leather, Carbon Steel Toe Cap','sale','Assets/Products/SHO-PR3-Front-Low Cut (MG Safety).png','Assets/Products/SHO-PR3-Back-Low Cut (MG Safety).png','Assets/Products/Modal/SizeGuide-Front and Back-Shoes.png','Assets/Products/Modal/SizeGuide-Measurements-Shoes.png',50);
