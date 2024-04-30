/*
  Warnings:

  - Made the column `adminId` on table `news` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `News_adminId_fkey`;

-- AlterTable
ALTER TABLE `news` MODIFY `adminId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
