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
-- insert into store_products (description) values('refreshing mask');

INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');

insert into store_products (product_id, description, price, units_sold) values('A','facial cream', 10.0, 0);


INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');



insert into stores(store_name, store_code) values('Lilly_Cosmetics', 'L123');
insert into stores(store_name, store_code) values('By Moses', 'M123');




insert into store_products (product_id, description, price, units_sold, store_id) values('D','refreshing mask', 15.0, 0, 1);


insert into store_products (product_id, description, price, units_sold, store_id) values('H','Coffee cups', 15.0, 0, 2);

UPDATE store_products 
('H','Coffee cups', 15.0, 0, 2);