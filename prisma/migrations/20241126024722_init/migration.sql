-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cv" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "people" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "priceDay" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isPublish" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "carName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderEndDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Order_carId_idx" ON "Order"("carId");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
