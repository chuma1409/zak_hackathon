CREATE TABLE stores(
   id serial not null primary key,
   store_code text not null,
   store_name text not null
);

CREATE TABLE store_products(
    id serial not null primary key,
    description text not null,
    price decimal(10,2),
    cost_per_item text not null,
    units_sold int,
    store_id int,
    FOREIGN KEY(store_id) REFERENCES stores(id)
);