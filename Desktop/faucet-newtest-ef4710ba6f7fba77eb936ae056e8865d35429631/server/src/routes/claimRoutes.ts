import express, { RequestHandler } from 'express';
import { claimController } from '../controllers/claimController';
import { Claim } from '../models/Claim';

const router = express.Router();

router.get('/check/:walletAddress', claimController.checkClaim as RequestHandler);
router.post('/record', claimController.recordClaim as RequestHandler);

// Test routes
router.get('/test-connection', async (req, res) => {
  try {
    const claims = await Claim.find().limit(5);
    res.json({ 
      status: 'Connected to MongoDB',
      sampleClaims: claims,
      totalClaims: await Claim.countDocuments()
    });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

router.get('/all-claims', async (req, res) => {
  try {
    const claims = await Claim.find();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch claims' });
  }
});

// Add this route for testing
router.post('/test-claim', async (req, res) => {
  try {
    const testClaim = await Claim.create({
      walletAddress: '0xTestAddress123',
      lastClaimTime: new Date(),
      totalClaims: 1
    });
    res.json({ 
      message: 'Test claim created',
      claim: testClaim 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create test claim' });
  }
});

export default router; 