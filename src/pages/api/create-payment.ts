// API endpoint to create payment orders
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { registrationType, fullName, email, phone, teamName, projectName } = data;

        // Validate required fields
        if (!registrationType || !fullName || !email || !phone) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Calculate amount based on registration type
        const amount = registrationType === 'team' ? 1000 : 300;

        // Generate unique order ID
        const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Mock Zoho API call - Replace with real Zoho API later
        // In production, call Zoho Payments API here with secret keys
        const mockPaymentResponse = {
            success: true,
            orderId: orderId,
            amount: amount,
            currency: 'INR',
            paymentUrl: `${import.meta.env.BASE_URL || 'http://localhost:4321'}/payment/mock-gateway?order=${orderId}&amount=${amount}`,
            qrCodeData: `upi://pay?pa=merchant@upi&pn=CODEKAR&am=${amount}&cu=INR&tn=Registration-${orderId}`,
            expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
        };

        // Store transaction (in production, save to database)
        const transaction = {
            orderId,
            registrationType,
            amount,
            status: 'pending',
            userDetails: {
                fullName,
                email,
                phone,
                teamName: registrationType === 'team' ? teamName : null,
                projectName,
            },
            createdAt: new Date().toISOString(),
            paymentUrl: mockPaymentResponse.paymentUrl,
        };

        console.log('Payment created:', transaction);

        return new Response(
            JSON.stringify({
                success: true,
                orderId: mockPaymentResponse.orderId,
                amount: mockPaymentResponse.amount,
                currency: mockPaymentResponse.currency,
                paymentUrl: mockPaymentResponse.paymentUrl,
                qrCodeData: mockPaymentResponse.qrCodeData,
                expiresAt: mockPaymentResponse.expiresAt,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
    } catch (error) {
        console.error('Payment creation error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to create payment' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// Handle OPTIONS for CORS
export const OPTIONS: APIRoute = async () => {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
};
