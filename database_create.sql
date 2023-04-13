
CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  type ENUM('customer', 'manager') NOT NULL DEFAULT 'customer'
);

CREATE TABLE Billboards (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  costPerDay INT NOT NULL,
  type ENUM('1-sided', '2-sided', '3-sided') NOT NULL,
  material ENUM('digital', 'painted') NOT NULL
);

CREATE TABLE Cities (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Status (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  prerequisite_status_id INT,
  name ENUM('pending', 'wait for payment', 'approved', 'canceled') NOT NULL,
  CONSTRAINT fk_status_prerequisite_status_id
    FOREIGN KEY (prerequisite_status_id)
    REFERENCES Status(id)
);

CREATE TABLE Orders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  billboard_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status_id INT NOT NULL,
  user_id INT NOT NULL,
  city_id INT NOT NULL,
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
