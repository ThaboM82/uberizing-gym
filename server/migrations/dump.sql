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
('Noor', 'Sheikh', 'noorsheikh', 'noorsheikh', 'GYM_MEMBER', 'noorsheikh@gmail.com', '1990-12-12', '1234567890', 'M')
('Brandon', 'Stamour', 'brandon', 'GYM_MEMBER', 'brandon@gmail.com', '1990-12-12', '1234567890', 'M');
