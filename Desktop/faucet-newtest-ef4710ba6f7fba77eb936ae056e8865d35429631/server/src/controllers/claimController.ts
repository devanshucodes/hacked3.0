import { Request, Response } from 'express';
import { Claim } from '../models/Claim';

export const claimController = {
  checkClaim: async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      console.log('Checking claim for wallet:', walletAddress);
      
      const claim = await Claim.findOne({ walletAddress });
      console.log('Found claim:', claim);
      
      if (!claim) {
        // No previous claim, can claim immediately
        return res.json({ 
          canClaim: true, 
          timeLeft: 0,
          totalClaims: 0 
        });
      }

      const now = new Date();
      const lastClaim = new Date(claim.lastClaimTime);
      const timeDiff = now.getTime() - lastClaim.getTime();
      const hoursLeft = 24 - (timeDiff / (1000 * 60 * 60));
      
      res.json({
        canClaim: hoursLeft <= 0,
        timeLeft: Math.max(0, hoursLeft * 60 * 60 * 1000),
        totalClaims: claim.totalClaims
      });
    } catch (error) {
      console.error('Check claim error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  recordClaim: async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.body;
      let claim = await Claim.findOne({ walletAddress });
      
      if (claim) {
        const now = new Date();
        const lastClaim = new Date(claim.lastClaimTime);
        const hoursSinceLastClaim = (now.getTime() - lastClaim.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceLastClaim < 24) {
          return res.status(400).json({ 
            error: 'Cannot claim yet',
            timeLeft: (24 - hoursSinceLastClaim) * 60 * 60 * 1000 
          });
        }
        
        claim.lastClaimTime = now;
        claim.totalClaims += 1;
        await claim.save();
      } else {
        // First time claim
        claim = await Claim.create({
          walletAddress,
          lastClaimTime: new Date(),
          totalClaims: 1
        });
      }
      
      res.json({ 
        success: true, 
        claim,
        message: 'Tokens claimed successfully' 
      });
    } catch (error) {
      console.error('Record claim error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}; 