/* Replace with your SQL commands */
CREATE TABLE  order_products (
id SERIAL PRIMARY KEY,
pro_id INTEGER REFERENCES products(id),
order_id INTEGER REFERENCES orders(id),
quantity INTEGER
);
