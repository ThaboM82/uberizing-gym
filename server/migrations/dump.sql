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
  `updated_on` DATETIME,
  `street_address` VARCHAR(50) DEFAULT NULL,
  `street_address2` VARCHAR(50) DEFAULT NULL,
  `city` VARCHAR(20) DEFAULT NULL,
  `state` VARCHAR(15) DEFAULT NULL,
  `zip` VARCHAR(5) DEFAULT NULL,
  `country` VARCHAR(15) DEFAULT NULL
);

INSERT INTO `user`
(`first_name`, `last_name`, `username`, `password`, `user_type`, `email`, `birth_date`, `phone`, `gender`, `street_address`, `city`, `state`, `zip`, `country`)
VALUES
('Noor', 'Sheikh', 'noorsheikh', 'noorsheikh', 'GYM_MEMBER', 'noorsheikh@gmail.com', '1990-12-12', '1234567890', 'M', '4400 University Dr', 'Fairfax', 'VA', '22030', 'USA'),
('Brandon', 'Stamour', 'brandon', 'password', 'GYM_MEMBER', 'brandon@gmail.com', '1990-12-12', '1234567890', 'M', '4400 University Dr', 'Fairfax', 'VA', '22030', 'USA'),
('Laurel', 'Fielding', 'lfielding', 'password', 'GYM_MEMBER', 'lfieldin@gmu.edu', '1990-12-12', '1234567890', 'F', '4400 University Dr', 'Fairfax', 'VA', '22030', 'USA');

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

DROP TABLE IF EXISTS `saved_gym`;
CREATE TABLE `saved_gym` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `gym_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`gym_id`) REFERENCES `gym`(`id`)
);

INSERT INTO `saved_gym`
(`user_id`, `gym_id`)
VALUES
(1,1), (1,2), (1,3), (1,7), (1,8), (1,12), (1,13), (1,14), (1,15),
(2,1), (2,4), (2,5), (2,7), (2,9), (2,10), (2,12), (2,16), (2,17), (2,18),
(3,1), (3,6), (3,7), (3,11), (3,12), (3,19), (3,20);

DROP TABLE IF EXISTS `gym_event`;
CREATE TABLE `gym_event` (
   `id` INT AUTO_INCREMENT PRIMARY KEY,
   `gym_id` INT NOT NULL,
   `start` DATETIME NOT NULL,
   `end` DATETIME NOT NULL,
   `title` VARCHAR(50) NOT NULL,
   `description` VARCHAR(250) NOT NULL,
   FOREIGN KEY (`gym_id`) REFERENCES `gym`(`id`)
);

INSERT INTO `gym_event`
(`gym_id`, `start`, `end`, `title`, `description`)
VALUES
(1, '2020-04-01 10:00:00', '2020-04-07 10:00:00', 'Health & Food Fair', 'Reach out to fitness brands in the food industry, especially those looking to expand their market, and host a health and fitness food fair.'),
(2, '2020-04-01 10:00:00', '2020-04-07 10:00:00', 'Family Workout Session', 'Make it a family affair and invite family members to come out and do group workout sessions separate or together.'),
(3, '2020-04-01 10:10:00', '2020-04-03 10:00:00', 'Host a Charity Event', 'Find a charity in your community that you would like to support and host a paid work out session where half the proceeds go to those in need and the other goes to cover fundraising expenses.'),
(4, '2020-04-01 08:00:00', '2020-04-02 10:00:00', 'All Nighter Work Out', 'Host an all-nighter workout class at your gym to attract hardcore gym goers, and persuade them to join your gym.'),
(5, '2020-04-02 10:00:00', '2020-04-02 08:00:00', 'Fitness Trainer Workshop', 'Take an educational approach and host a fitness trainer workshop at your gym.'),
(6, '2020-04-10 10:00:00', '2020-04-10 10:00:00', 'Celebrate Client Success', 'Invite current members and people in your community to share success stories as you help to celebrate their accomplishments.'),
(7, '2020-04-25 10:00:00', '2020-04-26 06:00:00', 'Walkathon Challenge', 'Whether you are a hardcore fitness expert or someone is looking for a fun event to attend, everyone loves walkathons.'),
(8, '2020-05-01 10:00:00', '2020-05-01 10:00:00', 'Free Gym For All', 'Host an event where people can use your gym and attend classes for free for one night or a week.'),
(9, '2020-05-09 06:00:00', '2020-05-09 10:00:00', 'Obstacle Course Competition', 'Transform your gym or rent a large space and turn it into the ultimate fitness obstacle course.'),
(10, '2020-05-16 10:00:00', '2020-05-17 10:00:00', 'Mass Workout Meet & Greet', 'Find a park or public space and host a mass workout meet and greet!'),
(11, '2020-04-01 10:00:00', '2020-05-07 10:00:00', 'Health & Food Fair', 'Reach out to fitness brands in the food industry, especially those looking to expand their market, and host a health and fitness food fair.'),
(12, '2020-04-01 10:00:00', '2020-04-07 10:00:00', 'Family Workout Session', 'Make it a family affair and invite family members to come out and do group workout sessions separate or together.'),
(13, '2020-04-01 10:10:00', '2020-04-03 10:00:00', 'Host a Charity Event', 'Find a charity in your community that you would like to support and host a paid work out session where half the proceeds go to those in need and the other goes to cover fundraising expenses.'),
(14, '2020-04-01 08:00:00', '2020-04-02 10:00:00', 'All Nighter Work Out', 'Host an all-nighter workout class at your gym to attract hardcore gym goers, and persuade them to join your gym.'),
(15, '2020-04-02 10:00:00', '2020-04-02 08:00:00', 'Fitness Trainer Workshop', 'Take an educational approach and host a fitness trainer workshop at your gym.'),
(16, '2020-04-10 10:00:00', '2020-04-10 10:00:00', 'Celebrate Client Success', 'Invite current members and people in your community to share success stories as you help to celebrate their accomplishments.'),
(17, '2020-04-25 10:00:00', '2020-04-26 06:00:00', 'Walkathon Challenge', 'Whether you are a hardcore fitness expert or someone is looking for a fun event to attend, everyone loves walkathons.'),
(18, '2020-05-01 10:00:00', '2020-05-01 10:00:00', 'Free Gym For All', 'Host an event where people can use your gym and attend classes for free for one night or a week.'),
(19, '2020-05-09 06:00:00', '2020-05-09 10:00:00', 'Obstacle Course Competition', 'Transform your gym or rent a large space and turn it into the ultimate fitness obstacle course.'),
(20, '2020-05-16 10:00:00', '2020-05-17 10:00:00', 'Mass Workout Meet & Greet', 'Find a park or public space and host a mass workout meet and greet!'),
(20, '2020-04-01 10:00:00', '2020-05-07 10:00:00', 'Health & Food Fair', 'Reach out to fitness brands in the food industry, especially those looking to expand their market, and host a health and fitness food fair.'),
(19, '2020-04-01 10:00:00', '2020-04-07 10:00:00', 'Family Workout Session', 'Make it a family affair and invite family members to come out and do group workout sessions separate or together.'),
(18, '2020-04-01 10:10:00', '2020-04-03 10:00:00', 'Host a Charity Event', 'Find a charity in your community that you would like to support and host a paid work out session where half the proceeds go to those in need and the other goes to cover fundraising expenses.'),
(17, '2020-04-01 08:00:00', '2020-04-02 10:00:00', 'All Nighter Work Out', 'Host an all-nighter workout class at your gym to attract hardcore gym goers, and persuade them to join your gym.'),
(16, '2020-04-02 10:00:00', '2020-04-02 08:00:00', 'Fitness Trainer Workshop', 'Take an educational approach and host a fitness trainer workshop at your gym.'),
(15, '2020-04-10 10:00:00', '2020-04-10 10:00:00', 'Celebrate Client Success', 'Invite current members and people in your community to share success stories as you help to celebrate their accomplishments.'),
(14, '2020-04-25 10:00:00', '2020-04-26 06:00:00', 'Walkathon Challenge', 'Whether you are a hardcore fitness expert or someone is looking for a fun event to attend, everyone loves walkathons.'),
(13, '2020-05-01 10:00:00', '2020-05-01 10:00:00', 'Free Gym For All', 'Host an event where people can use your gym and attend classes for free for one night or a week.'),
(12, '2020-05-09 06:00:00', '2020-05-09 10:00:00', 'Obstacle Course Competition', 'Transform your gym or rent a large space and turn it into the ultimate fitness obstacle course.'),
(11, '2020-05-16 10:00:00', '2020-05-17 10:00:00', 'Mass Workout Meet & Greet', 'Find a park or public space and host a mass workout meet and greet!'),
(10, '2020-04-01 10:00:00', '2020-05-07 10:00:00', 'Health & Food Fair', 'Reach out to fitness brands in the food industry, especially those looking to expand their market, and host a health and fitness food fair.'),
(9, '2020-04-01 10:00:00', '2020-04-07 10:00:00', 'Family Workout Session', 'Make it a family affair and invite family members to come out and do group workout sessions separate or together.'),
(8, '2020-04-01 10:10:00', '2020-04-03 10:00:00', 'Host a Charity Event', 'Find a charity in your community that you would like to support and host a paid work out session where half the proceeds go to those in need and the other goes to cover fundraising expenses.'),
(7, '2020-04-01 08:00:00', '2020-04-02 10:00:00', 'All Nighter Work Out', 'Host an all-nighter workout class at your gym to attract hardcore gym goers, and persuade them to join your gym.'),
(6, '2020-04-02 10:00:00', '2020-04-02 08:00:00', 'Fitness Trainer Workshop', 'Take an educational approach and host a fitness trainer workshop at your gym.'),
(5, '2020-04-10 10:00:00', '2020-04-10 10:00:00', 'Celebrate Client Success', 'Invite current members and people in your community to share success stories as you help to celebrate their accomplishments.'),
(4, '2020-04-25 10:00:00', '2020-04-26 06:00:00', 'Walkathon Challenge', 'Whether you are a hardcore fitness expert or someone is looking for a fun event to attend, everyone loves walkathons.'),
(3, '2020-05-01 10:00:00', '2020-05-01 10:00:00', 'Free Gym For All', 'Host an event where people can use your gym and attend classes for free for one night or a week.'),
(2, '2020-05-09 06:00:00', '2020-05-09 10:00:00', 'Obstacle Course Competition', 'Transform your gym or rent a large space and turn it into the ultimate fitness obstacle course.'),
(1, '2020-05-16 10:00:00', '2020-05-17 10:00:00', 'Mass Workout Meet & Greet', 'Find a park or public space and host a mass workout meet and greet!'),
(10, '2020-04-01 10:00:00', '2020-05-07 10:00:00', 'Health & Food Fair', 'Reach out to fitness brands in the food industry, especially those looking to expand their market, and host a health and fitness food fair.'),
(9, '2020-04-01 10:00:00', '2020-04-07 10:00:00', 'Family Workout Session', 'Make it a family affair and invite family members to come out and do group workout sessions separate or together.'),
(8, '2020-04-01 10:10:00', '2020-04-03 10:00:00', 'Host a Charity Event', 'Find a charity in your community that you would like to support and host a paid work out session where half the proceeds go to those in need and the other goes to cover fundraising expenses.'),
(7, '2020-04-01 08:00:00', '2020-04-02 10:00:00', 'All Nighter Work Out', 'Host an all-nighter workout class at your gym to attract hardcore gym goers, and persuade them to join your gym.'),
(6, '2020-04-02 10:00:00', '2020-04-02 08:00:00', 'Fitness Trainer Workshop', 'Take an educational approach and host a fitness trainer workshop at your gym.'),
(5, '2020-04-10 10:00:00', '2020-04-10 10:00:00', 'Celebrate Client Success', 'Invite current members and people in your community to share success stories as you help to celebrate their accomplishments.'),
(4, '2020-04-25 10:00:00', '2020-04-26 06:00:00', 'Walkathon Challenge', 'Whether you are a hardcore fitness expert or someone is looking for a fun event to attend, everyone loves walkathons.'),
(3, '2020-05-01 10:00:00', '2020-05-01 10:00:00', 'Free Gym For All', 'Host an event where people can use your gym and attend classes for free for one night or a week.'),
(2, '2020-05-09 06:00:00', '2020-05-09 10:00:00', 'Obstacle Course Competition', 'Transform your gym or rent a large space and turn it into the ultimate fitness obstacle course.'),
(1, '2020-05-16 10:00:00', '2020-05-17 10:00:00', 'Mass Workout Meet & Greet', 'Find a park or public space and host a mass workout meet and greet!'),
(20, '2020-04-01 10:00:00', '2020-05-07 10:00:00', 'Health & Food Fair', 'Reach out to fitness brands in the food industry, especially those looking to expand their market, and host a health and fitness food fair.'),
(19, '2020-04-01 10:00:00', '2020-04-07 10:00:00', 'Family Workout Session', 'Make it a family affair and invite family members to come out and do group workout sessions separate or together.'),
(18, '2020-04-01 10:10:00', '2020-04-03 10:00:00', 'Host a Charity Event', 'Find a charity in your community that you would like to support and host a paid work out session where half the proceeds go to those in need and the other goes to cover fundraising expenses.'),
(17, '2020-04-01 08:00:00', '2020-04-02 10:00:00', 'All Nighter Work Out', 'Host an all-nighter workout class at your gym to attract hardcore gym goers, and persuade them to join your gym.'),
(16, '2020-04-02 10:00:00', '2020-04-02 08:00:00', 'Fitness Trainer Workshop', 'Take an educational approach and host a fitness trainer workshop at your gym.'),
(15, '2020-04-10 10:00:00', '2020-04-10 10:00:00', 'Celebrate Client Success', 'Invite current members and people in your community to share success stories as you help to celebrate their accomplishments.'),
(14, '2020-04-25 10:00:00', '2020-04-26 06:00:00', 'Walkathon Challenge', 'Whether you are a hardcore fitness expert or someone is looking for a fun event to attend, everyone loves walkathons.'),
(13, '2020-05-01 10:00:00', '2020-05-01 10:00:00', 'Free Gym For All', 'Host an event where people can use your gym and attend classes for free for one night or a week.'),
(12, '2020-05-09 06:00:00', '2020-05-09 10:00:00', 'Obstacle Course Competition', 'Transform your gym or rent a large space and turn it into the ultimate fitness obstacle course.'),
(11, '2020-05-16 10:00:00', '2020-05-17 10:00:00', 'Mass Workout Meet & Greet', 'Find a park or public space and host a mass workout meet and greet!');

DROP TABLE IF EXISTS `user_event`;
CREATE TABLE `user_event` (
   `id` INT AUTO_INCREMENT PRIMARY KEY,
   `user_id` INT NOT NULL,
   `event_id` INT NOT NULL,
   FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
   FOREIGN KEY (`event_id`) REFERENCES `gym_event`(`id`)
);

INSERT INTO `user_event`
(`user_id`, `event_id`)
VALUES
(1,1), (1,2), (1,3), (1,7), (1,8), (1,12), (1,13), (1,14), (1,15),
(2,1), (2,4), (2,5), (2,7), (2,9), (2,10), (2,12), (2,16), (2,17), (2,18),
(3,1), (3,6), (3,7), (3,11), (3,12), (3,19), (3,20);