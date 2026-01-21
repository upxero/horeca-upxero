const { Resend } = require('resend');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  // Handle OPTIONS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, phone, business, planInterest, source, message } = data;

    if (!name || !email || !phone || !business || !planInterest) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #0F3460 0%, #1a4d7a 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .field {
            margin-bottom: 20px;
            background: white;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #FF6B35;
        }
        .field-label {
            font-weight: bold;
            color: #0F3460;
            margin-bottom: 5px;
        }
        .field-value {
            color: #333;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 Nieuwe Demo Aanvraag</h1>
            <p>Er is een nieuwe demo aanvraag ontvangen via de website</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="field-label">Naam:</div>
                <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
            </div>
            
            <div class="field">
                <div class="field-label">Telefoon:</div>
                <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
            </div>
            
            <div class="field">
                <div class="field-label">Restaurant/Zaak:</div>
                <div class="field-value">${business}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Interesse in Plan:</div>
                <div class="field-value">${planInterest.charAt(0).toUpperCase() + planInterest.slice(1)}</div>
            </div>

            ${source ? `<div class="field">
              <div class="field-label">Hoe heeft de klant ons gevonden:</div>
              <div class="field-value">${source}</div>
            </div>` : ''}
            
            ${message ? `<div class="field">
                <div class="field-label">Bericht:</div>
                <div class="field-value">${message}</div>
            </div>` : ''}
        </div>
        <div class="footer">
            <p>Deze email is verzonden via het Upxero contact formulier</p>
        </div>
    </div>
</body>
</html>
    `;

    const result = await resend.emails.send({
      from: 'no-reply@upxero.com',
      to: 'info@upxero.com',
      replyTo: email,
      subject: `Nieuwe Demo Aanvraag van ${name} (${business})`,
      html: htmlContent
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Demo aanvraag succesvol verzonden',
        id: result.id
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Er is een fout opgetreden bij het verzenden van uw aanvraag. Probeer het later opnieuw.',
        details: error.message
      })
    };
  }
};
