
CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  type ENUM('customer', 'manager') NOT NULL DEFAULT 'customer'
);

INSERT INTO Users (email, password, type) VALUES
('test1@example.com', 'password1', 'customer'),
('test2@example.com', 'password2', 'manager'),
('test3@example.com', 'password3', 'customer');


CREATE TABLE Billboards (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  costPerDay INT NOT NULL,
  type ENUM('1-sided', '2-sided', '3-sided') NOT NULL,
  material ENUM('digital', 'painted') NOT NULL,
  size ENUM('small', 'medium', 'large') NOT NULL DEFAULT 'medium'
);

INSERT INTO Billboards (costPerDay, type, material, size) VALUES
  (100, '1-sided', 'digital', 'small'),
  (150, '2-sided', 'painted', 'large'),
  (200, '3-sided', 'digital', 'medium'),
  (120, '1-sided', 'painted', 'small'),
  (180, '2-sided', 'digital', 'large');

CREATE TABLE Cities (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO Cities (name) VALUES
('Almaty'),
('Astana'),
('Karaganda'),
('Shymkent'),
('Aktau'),
('Atyrau'),
('Kostanay'),
('Taraz'),
('Petropavl'),
('Pavlodar');

CREATE TABLE Status (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name ENUM('pending', 'wait for payment', 'approved', 'canceled') NOT NULL
);

INSERT INTO Status (name) VALUES ('pending');
INSERT INTO Status (name) VALUES ('wait for payment');
INSERT INTO Status (name) VALUES ('approved');
INSERT INTO Status (name) VALUES ('canceled');

CREATE TABLE Orders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  billboard_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status_id INT NOT NULL,
  user_id INT NOT NULL,
  city_id INT NOT NULL,
  cost INT NOT NULL,
  CONSTRAINT fk_order_billboard_id
    FOREIGN KEY (billboard_id)
    REFERENCES Billboards(id),
  CONSTRAINT fk_order_status_id
    FOREIGN KEY (status_id)
    REFERENCES Status(id),
  CONSTRAINT fk_order_user_id
    FOREIGN KEY (user_id)
    REFERENCES Users(id),
  CONSTRAINT fk_order_city_id
    FOREIGN KEY (city_id)
    REFERENCES Cities(id)
);

