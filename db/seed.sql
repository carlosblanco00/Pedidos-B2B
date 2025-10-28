USE customers_db;

-- ===========================
--  CUSTOMERS
-- ===========================
INSERT INTO customers (name, email, phone)
VALUES
('Carlos Blanco', 'carlos@example.com', '+57 3001112233'),
('Ana Torres', 'ana.torres@example.com', '+57 3102223344'),
('Luis Gómez', 'luis.gomez@example.com', '+57 3203334455');

-- ===========================
--  PRODUCTS
-- ===========================
INSERT INTO products (sku, name, price_cents, stock)
VALUES
('SKU-001', 'Xbox Serie S', 1600000, 100),
('SKU-002', 'Control Xbox', 95000, 50),
('SKU-003', 'Monitor LG', 1050000, 30);

-- ===========================
--  ORDERS
-- ===========================
INSERT INTO orders (customer_id, status, total_cents)
VALUES
(1, 'CREATED', 140000),
(2, 'CONFIRMED', 95000);

-- ===========================
--  ORDER ITEMS
-- ===========================
INSERT INTO order_items (order_id, product_id, qty, unit_price_cents, subtotal_cents)
VALUES
(1, 1, 2, 1600000, 3200000),
(2, 2, 1, 95000, 95000);

-- ===========================
--  IDEMPOTENCY KEYS
-- ===========================
INSERT INTO idempotency_keys (`key`, target_type, target_id, status, response_body, created_at, expires_at)
VALUES
('key-001', 'order', 1, 'COMPLETED', JSON_OBJECT('orderId', 1, 'status', 'CREATED'), NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY)),
('key-002', 'order', 2, 'COMPLETED', JSON_OBJECT('orderId', 2, 'status', 'CONFIRMED'), NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY));
