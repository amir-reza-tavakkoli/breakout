/*
  Warnings:

  - The primary key for the `FoodHasCategories` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "FoodHasCategories" DROP CONSTRAINT "FoodHasCategories_categoryId_fkey";

-- AlterTable
ALTER TABLE "FoodHasCategories" DROP CONSTRAINT "FoodHasCategories_pkey",
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "FoodHasCategories_pkey" PRIMARY KEY ("foodId", "categoryId");

-- AddForeignKey
ALTER TABLE "FoodHasCategories" ADD CONSTRAINT "FoodHasCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
