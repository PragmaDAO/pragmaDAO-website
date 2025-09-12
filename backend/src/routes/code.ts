import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import archiver from 'archiver';
import { Request, Response, NextFunction } from 'express'; // Added
import jwt from 'jsonwebtoken'; // Added

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Added

// Middleware to verify JWT token (Copied from profile.ts)
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    (req as any).user = user; // Attach user payload to request
    next();
  });
};

const router = Router();
const prisma = new PrismaClient();

// POST /api/code - Save or update user code for a lesson
router.post('/', authenticateToken, async (req, res) => {
  const { lessonId, code } = req.body;
  const userId = (req as any).user?.id; // req.user is populated by authenticateToken

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!lessonId || code === undefined) {
    return res.status(400).json({ message: 'lessonId and code are required' });
  }

  try {
    const userCode = await prisma.userCode.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        code,
      },
      create: {
        userId,
        lessonId,
        code,
      },
    });
    res.status(200).json(userCode);
  } catch (error) {
    console.error('Error saving user code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/code/:lessonId - Retrieve user code for a lesson
router.get('/:lessonId', authenticateToken, async (req, res) => {
  const { lessonId } = req.params;
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const userCode = await prisma.userCode.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    });

    if (userCode) {
      res.status(200).json({ code: userCode.code });
    } else {
      res.status(404).json({ message: 'Code not found for this lesson and user' });
    }
  } catch (error) {
    console.error('Error retrieving user code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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
