/*
  Warnings:

  - You are about to drop the column `image` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `profile` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middlename` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` DROP COLUMN `image`,
    DROP COLUMN `middleName`,
    ADD COLUMN `gender` ENUM('FEMALE', 'MALE') NOT NULL,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `middlename` VARCHAR(191) NOT NULL;
