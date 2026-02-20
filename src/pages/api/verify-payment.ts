import type { APIRoute } from 'astro';
import dbConnect from '../../lib/db';
import Payment from '../../models/Payment';

export const GET: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const transactionId = url.searchParams.get('transactionId');

        if (!transactionId) {
            return new Response(JSON.stringify({ error: 'Missing transactionId' }), { status: 400 });
        }

        await dbConnect();

        const payment = await Payment.findOne({ transactionId });

        if (!payment) {
            return new Response(JSON.stringify({ status: 'NOT_FOUND' }), { status: 404 });
        }

        return new Response(JSON.stringify({ status: payment.status }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};
