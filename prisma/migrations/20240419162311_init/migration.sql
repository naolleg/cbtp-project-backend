-- CreateTable
CREATE TABLE `Child` (
    `child_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mother_id` INTEGER NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NULL,
    `blood_type` VARCHAR(191) NULL,
    `middlename` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`child_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor` (
    `doctor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `contact_number` VARCHAR(191) NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`doctor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mother` (
    `mother_id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phonenumber` VARCHAR(191) NULL,

    PRIMARY KEY (`mother_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `News` (
    `news_id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` LONGBLOB NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `publication_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`news_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `profile_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `image` LONGBLOB NULL,

    PRIMARY KEY (`profile_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `schedule_id` INTEGER NOT NULL AUTO_INCREMENT,
    `child_id` INTEGER NOT NULL,
    `next_schedule` DATETIME(3) NOT NULL,

    PRIMARY KEY (`schedule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` INTEGER NULL,
    `createdDate` DATETIME(3) NULL,
    `phonenumber` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vaccination` (
    `vaccination_id` INTEGER NOT NULL AUTO_INCREMENT,
    `child_id` INTEGER NOT NULL,
    `doctor_id` INTEGER NOT NULL,
    `creationDate` DATETIME(3) NOT NULL,
    `round` VARCHAR(191) NOT NULL,
    `vaccine_id` INTEGER NOT NULL,

    PRIMARY KEY (`vaccination_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vaccine` (
    `vaccine_id` INTEGER NOT NULL AUTO_INCREMENT,
    `v_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`vaccine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_mother_id_fkey` FOREIGN KEY (`mother_id`) REFERENCES `mother`(`mother_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mother` ADD CONSTRAINT `mother_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `mother`(`mother_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vaccination` ADD CONSTRAINT `Vaccination_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `Child`(`child_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vaccination` ADD CONSTRAINT `Vaccination_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `Doctor`(`doctor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vaccination` ADD CONSTRAINT `Vaccination_vaccine_id_fkey` FOREIGN KEY (`vaccine_id`) REFERENCES `Vaccine`(`vaccine_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
