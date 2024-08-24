const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const authMiddleware = require("../middleware/middleware");
const { Account } = require("../db");

router.get("/balance", authMiddleware, async (req, res) => {
    const id = req.userId;
    
    try {
        const balance = await Account.findOne({userid: id}, "balance");
        
        if(balance) {
            return res.status(200).json({
                balance
            });
        }
        else {
            return res.status(500).json({
                message: "error while fetching balance"
            });
        }
    }
    catch(err) {
        return res.status(500).json({
            message: "error while fetching balance "
        });
    }
    
});


router.post("/transfer", authMiddleware, async(req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { to, amount } = req.body;
    
    const sendAmount = parseInt(amount);

    const senderId = req.userId;

    const senderAccount = await Account.findOne({userid: senderId}).session(session);
    const balance = senderAccount.balance;

    if(sendAmount < 0) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "invalid amount"
        });
    }

    if(balance < sendAmount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "insufficient balance"
        });
    }
    
    const receiverAccount = await Account.findOne({userid: to}).session(session);
    
    if(!receiverAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "receiver does not exist"
        });
    }

    const amountDebited = await Account.updateOne({userid: senderId}, {$inc: {balance: -sendAmount}}).session(session);

    if(!amountDebited) {
        await session.abortTransaction();
        return res.status(500).json({
            message: "error while deducting the amount"
        });
    }

    const amountCredited = await Account.updateOne({userid: to}, {$inc: {balance: sendAmount}}).session(session);

    await session.commitTransaction();

    if(amountCredited) {
        return res.status(200).json({
            message: "transfer successful"
        });
    }

    return res.status(500).json({
        message: "transaction failed"
    });

});



module.exports = router;