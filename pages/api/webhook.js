import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false, // Disabling the default Next.js body parser
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Parse the incoming form data
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.status(500).json({ message: 'Error parsing the form data' });
                return;
            }

            // Extract and parse the 'data' field from Ko-fi
            const koFiData = JSON.parse(fields.data);
            
            // Handle the webhook data based on its type
            switch (koFiData.type) {
                case 'Donation':
                    // Process donation
                    break;
                case 'Subscription':
                    // Process subscription
                    break;
                case 'Commission':
                    // Process commission
                    break;
                case 'Shop Order':
                    // Process shop order
                    handleShopOrder(koFiData);
                    break;
                default:
                    // Handle other types or error
                    break;
            }

            // Respond with a 200 OK status
            res.status(200).json({ message: 'Webhook received successfully' });
        });
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

function handleShopOrder(data) {
    console.log('Processing Shop Order...');
    console.log(`From: ${data.from_name}`);
    console.log(`Email: ${data.email}`);
    console.log(`Amount: ${data.amount} ${data.currency}`);
    console.log(`Transaction ID: ${data.kofi_transaction_id}`);
    console.log(`Order URL: ${data.url}`);
    console.log(`Items: ${data.shop_items.map(item => `${item.variation_name} (${item.direct_link_code}) x ${item.quantity}`).join(', ')}`);
    console.log(`Shipping Address: ${data.shipping.full_name}, ${data.shipping.street_address}, ${data.shipping.city}, ${data.shipping.state_or_province}, ${data.shipping.postal_code}, ${data.shipping.country} (${data.shipping.country_code})`);
    console.log(`Telephone: ${data.shipping.telephone}`);

    // Add any additional processing logic here
    // For example, updating a database, sending a notification, etc.
}