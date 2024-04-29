/*
  Warnings:

  - You are about to drop the column `round` on the `vaccination` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `vaccination` DROP COLUMN `round`,
    ADD COLUMN `nextApp` DATETIME(3) NULL;
