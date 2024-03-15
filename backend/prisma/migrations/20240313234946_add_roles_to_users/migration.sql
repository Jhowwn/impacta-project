-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('vendedor', 'usuario');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'vendedor';
