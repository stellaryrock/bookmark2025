/*
  Warnings:

  - You are about to drop the column `remark` on the `Mark` table. All the data in the column will be lost.
  - Made the column `createdAt` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `FollowBook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Likes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Mark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Mark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Report` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Report` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Talk` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Talk` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `FollowBook` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `Likes` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `Mark` DROP COLUMN `remark`,
    ADD COLUMN `descript` VARCHAR(512) NULL,
    MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `Member` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `Report` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `Talk` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);
