/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FoodHasCategories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Food` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_statusId_fkey";

-- DropForeignKey
ALTER TABLE "FoodHasCategories" DROP CONSTRAINT "FoodHasCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "FoodHasCategories" DROP CONSTRAINT "FoodHasCategories_foodId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "FoodHasCategories";

-- CreateTable
CREATE TABLE "Hierarchy" (
    "predecessorId" TEXT NOT NULL,
    "successorId" TEXT NOT NULL,

    CONSTRAINT "Hierarchy_pkey" PRIMARY KEY ("successorId","predecessorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");

-- AddForeignKey
ALTER TABLE "Hierarchy" ADD CONSTRAINT "Hierarchy_predecessorId_fkey" FOREIGN KEY ("predecessorId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hierarchy" ADD CONSTRAINT "Hierarchy_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
