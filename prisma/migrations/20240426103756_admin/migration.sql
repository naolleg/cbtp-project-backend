-- AlterTable
ALTER TABLE `admins` ADD COLUMN `otp` VARCHAR(191) NULL,
    ADD COLUMN `otpCreatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `otpExpiry` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `AdminProfiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `AdminProfiles_adminId_key`(`adminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdminProfiles` ADD CONSTRAINT `AdminProfiles_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
