/*
  Warnings:

  - You are about to drop the column `image` on the `news` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `news` DROP COLUMN `image`,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL;