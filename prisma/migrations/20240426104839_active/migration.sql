-- AlterTable
ALTER TABLE `admins` MODIFY `activeSatatus` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `activeSatatus` INTEGER NOT NULL DEFAULT 1;
