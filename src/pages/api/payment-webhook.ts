// Webhook handler for payment verification
import type { APIRoute } from 'astro';
import dbConnect from '../../lib/db';
import Payment from '../../models/Payment';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        // 1. Verify Zoho signature (Simplified for this implementation)
        // In production: Validate request.headers.get('x-zoho-signature') with ZOHO_SIGNIN_KEY
        // const signature = request.headers.get('x-zoho-signature');
        // if (!isValidSignature(signature, data, import.meta.env.ZOHO_SIGNIN_KEY)) return new Response('Unauthorized', { status: 401 });

        await dbConnect();

        const { reference_id, status } = data; // Assuming Zoho sends transactionId as reference_id

        if (!reference_id) {
            return new Response('Missing reference_id', { status: 400 });
        }

        console.log('Webhook received for:', reference_id, status);

        if (status === 'SUCCESS' || status === 'captured') { // Check Zoho docs for exact status string
            const payment = await Payment.findOne({ transactionId: reference_id });

            if (payment) {
                if (payment.status !== 'SUCCESS') {
                    payment.status = 'SUCCESS';
                    payment.updatedAt = new Date();
                    await payment.save();
                    console.log(`Payment confirmed for ${reference_id}`);
                }
            } else {
                console.warn(`Payment record not found for ${reference_id}`);
            }
        }

        return new Response(JSON.stringify({ received: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Webhook processing error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};
