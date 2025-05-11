-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "linkedin_profile" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
