-- CreateTable
CREATE TABLE "Comparateur" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comparateur_pkey" PRIMARY KEY ("id")
);
