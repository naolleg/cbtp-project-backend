/*
  Warnings:

  - The primary key for the `child` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `child_id` on the `child` table. All the data in the column will be lost.
  - The primary key for the `mother` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mother_id` on the `mother` table. All the data in the column will be lost.
  - The primary key for the `news` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `news_id` on the `news` table. All the data in the column will be lost.
  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profile_id` on the `profile` table. All the data in the column will be lost.
  - The primary key for the `schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `schedule_id` on the `schedule` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - The primary key for the `vaccination` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `vaccination_id` on the `vaccination` table. All the data in the column will be lost.
  - The primary key for the `vaccine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `vaccine_id` on the `vaccine` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `mother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Vaccination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Vaccine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `child` DROP FOREIGN KEY `Child_mother_id_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `mother` DROP FOREIGN KEY `mother_userid_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `Schedule_child_id_fkey`;

-- DropForeignKey
ALTER TABLE `vaccination` DROP FOREIGN KEY `Vaccination_child_id_fkey`;

-- DropForeignKey
ALTER TABLE `vaccination` DROP FOREIGN KEY `Vaccination_vaccine_id_fkey`;

-- AlterTable
ALTER TABLE `address` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `child` DROP PRIMARY KEY,
    DROP COLUMN `child_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `mother` DROP PRIMARY KEY,
    DROP COLUMN `mother_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `news` DROP PRIMARY KEY,
    DROP COLUMN `news_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `profile` DROP PRIMARY KEY,
    DROP COLUMN `profile_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `schedule` DROP PRIMARY KEY,
    DROP COLUMN `schedule_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `vaccination` DROP PRIMARY KEY,
    DROP COLUMN `vaccination_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `vaccine` DROP PRIMARY KEY,
    DROP COLUMN `vaccine_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Address_user_id_key` ON `Address`(`user_id`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mother` ADD CONSTRAINT `mother_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_mother_id_fkey` FOREIGN KEY (`mother_id`) REFERENCES `mother`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `mother`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vaccination` ADD CONSTRAINT `Vaccination_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `Child`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vaccination` ADD CONSTRAINT `Vaccination_vaccine_id_fkey` FOREIGN KEY (`vaccine_id`) REFERENCES `Vaccine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
