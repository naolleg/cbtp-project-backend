/*
  Warnings:

  - Made the column `status` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdDate` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `status` INTEGER NOT NULL DEFAULT 1,
    MODIFY `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
