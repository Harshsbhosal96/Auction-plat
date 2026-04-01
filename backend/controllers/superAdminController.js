import mongoose from "mongoose";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Commission } from "../models/commissionSchema.js";
import { User } from "../models/userSchema.js";
import { Auction } from "../models/auctionSchema.js";
import { PaymentProof } from "../models/commissionProofSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const deleteAuctionItem = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format.", 400));
  }
  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction not found.", 404));
  }
  await auctionItem.deleteOne();
  res.status(200).json({
    success: true,
    message: "Auction item deleted successfully.",
  });
});

export const getAllPaymentProofs = catchAsyncErrors(async (req, res, next) => {
  let paymentProofs = await PaymentProof.find();
  res.status(200).json({
    success: true,
    paymentProofs,
  });
});

export const getPaymentProofDetail = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const paymentProofDetail = await PaymentProof.findById(id);
    res.status(200).json({
      success: true,
      paymentProofDetail,
    });
  }
);

export const updateProofStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { amount, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format.", 400));
  }

  const proof = await PaymentProof.findById(id);
  if (!proof) {
    return next(new ErrorHandler("Payment proof not found.", 404));
  }

  if (!["Pending", "Approved", "Rejected", "Settled"].includes(status)) {
    return next(new ErrorHandler("Invalid status value.", 400));
  }

  const updatedProof = await PaymentProof.findByIdAndUpdate(
    id,
    { status, amount },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  const user = await User.findById(updatedProof.userId);
  if (!user) {
    return next(new ErrorHandler("User not found for this proof.", 404));
  }

  if (status === "Approved") {
    const paymentAmount = Number(amount || updatedProof.amount);
    const remainingCommission = Math.max(user.unpaidCommission - paymentAmount, 0);

    await User.findByIdAndUpdate(user._id, {
      unpaidCommission: remainingCommission,
    });

    await Commission.create({
      amount: paymentAmount,
      user: user._id,
    });

    try {
      await sendEmail({
        email: user.email,
        subject: "Commission Payment Approved",
        message: `Dear ${user.userName},\n\nYour commission payment proof has been approved.\nPaid amount: ${paymentAmount}\nRemaining unpaid commission: ${remainingCommission}\n\nThank you,\nAuction Team`,
      });
    } catch (emailError) {
      console.error("Error sending approval email:", emailError.message);
    }
  }

  if (status === "Rejected") {
    try {
      await sendEmail({
        email: user.email,
        subject: "Commission Payment Rejected",
        message: `Dear ${user.userName},\n\nYour commission payment proof has been rejected. Please upload a valid proof and/or contact support for more details.\n\nThank you,\nAuction Team`,
      });
    } catch (emailError) {
      console.error("Error sending rejection email:", emailError.message);
    }
  }

  res.status(200).json({
    success: true,
    message: "Payment proof status updated.",
    proof: updatedProof,
  });
});

export const deletePaymentProof = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const proof = await PaymentProof.findById(id);
  if (!proof) {
    return next(new ErrorHandler("Payment proof not found.", 404));
  }
  await proof.deleteOne();
  res.status(200).json({
    success: true,
    message: "Payment proof deleted.",
  });
});

export const fetchAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $month: "$createdAt" },
          role: "$role",
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        month: "$_id.month",
        year: "$_id.year",
        role: "$_id.role",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { year: 1, month: 1 },
    },
  ]);

  const bidders = users.filter((user) => user.role === "Bidder");
  const auctioneers = users.filter((user) => user.role === "Auctioneer");

  const tranformDataToMonthlyArray = (data, totalMonths = 12) => {
    const result = Array(totalMonths).fill(0);

    data.forEach((item) => {
      result[item.month - 1] = item.count;
    });

    return result;
  };

  const biddersArray = tranformDataToMonthlyArray(bidders);
  const auctioneersArray = tranformDataToMonthlyArray(auctioneers);

  res.status(200).json({
    success: true,
    biddersArray,
    auctioneersArray,
  });
});

export const monthlyRevenue = catchAsyncErrors(async (req, res, next) => {
  const payments = await Commission.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  const tranformDataToMonthlyArray = (payments, totalMonths = 12) => {
    const result = Array(totalMonths).fill(0);

    payments.forEach((payment) => {
      result[payment._id.month - 1] = payment.totalAmount;
    });

    return result;
  };

  const totalMonthlyRevenue = tranformDataToMonthlyArray(payments);
  res.status(200).json({
    success: true,
    totalMonthlyRevenue,
  });
});
