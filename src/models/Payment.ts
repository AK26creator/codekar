import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED'],
        default: 'PENDING',
    },
    customer: {
        name: String,
        email: String,
        phone: String,
        teamName: String,
        projectName: String,
        registrationType: String
    },
    zohoReferenceId: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Avoid OverwriteModelError
export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
