-- CreateTable
CREATE TABLE "UserSubmittedCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "submissionTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "testResults" JSONB,
    "passed" BOOLEAN,

    CONSTRAINT "UserSubmittedCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserSubmittedCode_userId_lessonId_idx" ON "UserSubmittedCode"("userId", "lessonId");

-- AddForeignKey
ALTER TABLE "UserSubmittedCode" ADD CONSTRAINT "UserSubmittedCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
