import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    lastClaimTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    totalClaims: {
        type: Number,
        required: true,
        default: 1
    }
});

export const Claim = mongoose.model('Claim', claimSchema); 