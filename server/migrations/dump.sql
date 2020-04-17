DROP DATABASE IF EXISTS `egym`;
CREATE DATABASE `egym`;

USE `egym`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(25) DEFAULT NULL,
  `last_name` VARCHAR(25) DEFAULT NULL,
  `username` VARCHAR(25) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `user_type` ENUM('GYM_STAFF', 'GYM_MEMBER'),
  `email` VARCHAR(100) NOT NULL,
  `birth_date` DATE,
  `phone` VARCHAR(15) DEFAULT NULL,
  `gender` ENUM('M', 'F', 'U') DEFAULT NULL,
  `profile_image` VARCHAR(150) DEFAULT NULL,
  `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_on` DATETIME
);

INSERT INTO `user`
(`first_name`, `last_name`, `username`, `password`, `user_type`, `email`, `birth_date`, `phone`, `gender`)
VALUES
('Noor', 'Sheikh', 'noorsheikh', 'noorsheikh', 'GYM_MEMBER', 'noorsheikh@gmail.com', '1990-12-12', '1234567890', 'M'),
('Brandon', 'Stamour', 'brandon', 'password', 'GYM_MEMBER', 'brandon@gmail.com', '1990-12-12', '1234567890', 'M');

DROP TABLE IF EXISTS `gym`;
CREATE TABLE `gym` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `address` VARCHAR(50) NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `state` VARCHAR(2) NOT NULL,
  `zip_code` VARCHAR(5) NOT NULL,
  `latitude` DECIMAL(11, 8) NOT NULL,
  `longitude` DECIMAL(11, 8) NOT NULL
);

INSERT INTO `gym`
(`name`, `address`, `city`, `state`, `zip_code`, `latitude`, `longitude`)
VALUES
('LA Fitness', '3550 S Clark St', 'Arlington', 'VA', '22202', 38.844064, -77.052072),
('LA Fitness', '6200 Little River Turnpike', 'Alexandria', 'VA', '22312', 38.819833, -77.140574),
('LA Fitness', '6565 SPRINGFIELD MALL', 'Springfield', 'VA', '22150', 38.775572, -77.174784),
('LA Fitness', '7867 Heneska Loop', 'Alexandria', 'VA', '22315', 38.742963, -77.163774),
('LA Fitness', '13060 Worth Ave', 'Woodbridge', 'VA', '22192', 38.650022, -77.296380),
('LA Fitness', '9946 Liberia Ave', 'Manassas', 'VA', '20110', 38.742526, -77.452796),
('Onelife Fitness', '4238 Wilson Blvd #3018', 'Arlington', 'VA', '22203', 38.879590, -77.110408),
('Onelife Fitness', '5115 Leesburg Pike', 'Falls Church', 'VA', '22041', 38.844529, -77.118890),
('Onelife Fitness', '305 Hooffs Run Dr', 'Alexandria', 'VA', '22314', 38.799395, -77.063260),
('Onelife Fitness', '9250 Old Keene Mill Rd', 'Burke', 'VA', '22015', 38.777640, -77.263629),
('Onelife Fitness', '2401 Rock Bridge Ct', 'Woodbridge', 'VA', '22191', 38.628364, -77.286282),
("Gold's Gym", '1830 N Nash St', 'Arlington', 'VA', '22209', 38.896283, -77.073240),
("Gold's Gym", '1220 N Fillmore St Suite 150', 'Arlington', 'VA', '22201', 38.887327, -77.093143),
("Gold's Gym", '3910 Wilson Blvd', 'Arlington', 'VA', '22203', 38.879438, -77.106707),
("Gold's Gym", '6270 Arlington Blvd', 'Falls Church', 'VA', '22044', 38.871628, -77.152318),
("Gold's Gym", '2955 S Glebe Rd', 'Arlington', 'VA', '22206', 38.845789, -77.067403),
("Gold's Gym", '255 S Van Dorn St', 'Alexandria', 'VA', '22304', 38.812092, -77.133455),
("Gold's Gym", '6940-A Bradlick Shopping Center', 'Annandale', 'VA', '22003', 38.813485, -77.184011),
("Gold's Gym", '5620-A Ox Rd', 'Fairfax Station', 'VA', '22039', 38.801119, -77.327381),
("Gold's Gym", '7700 Gunston Plaza', 'Lorton', 'VA', '22079', 38.705415, -77.207101);
