CREATE TABLE stores(
   id serial not null primary key,
   store_code text not null,
   store_name text not null
);

CREATE TABLE store_products(
     product_id text primary key,
    description text not null,
    price decimal(10,2),
    units_sold int,
    store_id int,
    FOREIGN KEY(store_id) REFERENCES stores(id)
);

-- insert into store_products (description) values('facial cream');
-- insert into store_products (description) values('brightening serum');
-- insert into store_products (description) values('facial cleanser');
-- insert intheroku pg:psql

o store_products (description) values('refreshing mask');

INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');

insert into store_products (product_id, description, price, units_sold, store_id) values('A','facial cream', 10.0,1);


INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');



insert into stores(store_name, store_code) values('Lilly Cosmetics', 'L123');
insert into stores(store_name, store_code) values('By Moses', 'M123');


insert into store_products (product_id, description, price, units_sold, store_id) values('B','Brightening Serum', 50.0,0,1);
insert into store_products (product_id, description, price, units_sold, store_id) values('C','Refreshing Mask', 15.0,0,1);
insert into store_products (product_id, description, price, units_sold, store_id) values('D','Facial Cleanser', 90.0, 0, 1);

insert into store_products (product_id, description, price, units_sold, store_id) values('E','Coffee Mugs', 35.0, 0, 2);
insert into store_products (product_id, description, price, units_sold, store_id) values('F','Coffee Beans', 45.0, 0, 2);
insert into store_products (product_id, description, price, units_sold, store_id) values('G','Coffee Beer', 65.0, 0, 2);
insert into store_products (product_id, description, price, units_sold, store_id) values('H','Brewed Coffee', 10.0, 0, 2);

UPDATE store_products 
('H','Coffee cups', 15.0, 0, 2);

UPDATE stores SET total_sales  = 0 WHERE id = 1 AND id = 2;
('H','Coffee cups', 15.0, 0, 2);

ALTER TABLE stores ADD total_sales int;

DELETE FROM store_products WHERE product_id='G';