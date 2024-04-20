/*
  Warnings:

  - You are about to drop the column `address` on the `mother` table. All the data in the column will be lost.
  - You are about to drop the column `phonenumber` on the `mother` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `doctor` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userid]` on the table `mother` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activeSatatus` to the `Admins` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstname` on table `child` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `child` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `child` required. This step will fail if there are existing NULL values in that column.
  - Made the column `middlename` on table `child` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `adminId` to the `News` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `news` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `news` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `firstname` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phonenumber` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `round` on table `vaccination` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `adminId` to the `Vaccine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ageRange` to the `Vaccine` table without a default value. This is not possible if the table is not empty.
  - Made the column `v_name` on table `vaccine` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `doctor` DROP FOREIGN KEY `Doctor_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `vaccination` DROP FOREIGN KEY `Vaccination_doctor_id_fkey`;

-- AlterTable
ALTER TABLE `admins` ADD COLUMN `activeSatatus` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `child` MODIFY `firstname` VARCHAR(191) NOT NULL,
    MODIFY `lastname` VARCHAR(191) NOT NULL,
    MODIFY `gender` VARCHAR(191) NOT NULL,
    MODIFY `middlename` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `mother` DROP COLUMN `address`,
    DROP COLUMN `phonenumber`;

-- AlterTable
ALTER TABLE `news` ADD COLUMN `adminId` INTEGER NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `publication_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `middleName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('DOCTOR', 'REGISTRER', 'MOTHER', 'ADMIN') NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `phonenumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vaccination` MODIFY `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `round` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vaccine` ADD COLUMN `adminId` INTEGER NOT NULL,
    ADD COLUMN `ageRange` VARCHAR(191) NOT NULL,
    MODIFY `v_name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `doctor`;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `region` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `subcity` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employee_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `mother_userid_key` ON `mother`(`userid`);

-- CreateIndex
CREATE UNIQUE INDEX `Profile_user_id_key` ON `Profile`(`user_id`);

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vaccine` ADD CONSTRAINT `Vaccine_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vaccination` ADD CONSTRAINT `Vaccination_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
