import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import archiver from 'archiver';
import authenticateToken from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.get('/download', authenticateToken, async (req, res) => {
  const userId = (req as any).user.id; // Authenticated user's ID

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User ID not found.' });
  }

  try {
    // Fetch all user-submitted code snippets for the authenticated user
    const userCodeSnippets = await prisma.userSubmittedCode.findMany({
      where: { userId: userId },
      select: { code: true, lessonId: true, submissionTime: true }, // Select relevant fields
    });

    if (userCodeSnippets.length === 0) {
      return res.status(404).json({ message: 'No code snippets found for this user.' });
    }

    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    // Set the archive name
    res.attachment('user_code.zip');

    // Pipe the archive data to the response
    archive.pipe(res);

    // Append code snippets to the archive
    userCodeSnippets.forEach((snippet, index) => {
      const filename = `lesson_${snippet.lessonId}_${snippet.submissionTime?.toISOString().replace(/[:.]/g, '-') || index}.sol`;
      archive.append(snippet.code, { name: filename });
    });

    // Finalize the archive (this step finishes the archive process and closes the stream)
    archive.finalize();

  } catch (error) {
    console.error('Error downloading user code:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
