// Webhook handler for payment verification
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        // In production: Verify Zoho signature
        // const signature = request.headers.get('x-zoho-signature');
        // if (!verifySignature(signature, data)) {
        //   return new Response('Invalid signature', { status: 401 });
        // }

        const { orderId, status, transactionId, amount } = data;

        console.log('Webhook received:', { orderId, status, transactionId, amount });

        // Update payment status in database
        // In production: Update database with payment confirmation
        if (status === 'success') {
            // Mark registration as PAID
            // Send confirmation email
            console.log(`Payment successful for order ${orderId}`);
        }

        return new Response(
            JSON.stringify({ received: true }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Webhook error:', error);
        return new Response('Webhook processing failed', { status: 500 });
    }
};
