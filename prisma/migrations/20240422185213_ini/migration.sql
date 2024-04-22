-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `mother` DROP FOREIGN KEY `mother_userid_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mother` ADD CONSTRAINT `mother_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
