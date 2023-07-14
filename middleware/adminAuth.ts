import { Request, Response, NextFunction } from 'express';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  // Check if the user is an admin
  // Assuming you have a field called 'isAdmin' in your user schema
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  next();
};
