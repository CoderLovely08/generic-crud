-- CreateTable
CREATE TABLE "UserInfo" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "CrudItem" (
    "item_id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_price" INTEGER NOT NULL,
    "item_quantity" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CrudItem_pkey" PRIMARY KEY ("item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_user_name_key" ON "UserInfo"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_user_email_key" ON "UserInfo"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "CrudItem_item_name_key" ON "CrudItem"("item_name");

-- AddForeignKey
ALTER TABLE "CrudItem" ADD CONSTRAINT "CrudItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserInfo"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
