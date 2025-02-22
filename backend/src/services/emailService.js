const nodemailer = require('nodemailer');

// Constants
const CONSTANTS = {
    LOGO_URL: 'https://res.cloudinary.com/dl2hupy6v/image/upload/v1735660446/Screenshot_2024-12-31_212314_izcbh0.png',
    COMPANY_NAME: 'ClientsVoice',
    CURRENT_YEAR: new Date().getFullYear(),
    SUPPORT_EMAIL: 'support@clientsvoice.com'
};

// Email Templates - Reusable Components
const emailTemplates = {
    baseContainer: (content) => `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
            ${content}
        </div>`,

    header: (logoUrl = CONSTANTS.LOGO_URL) => `
        <div style="text-align: center; padding: 20px 0; background: linear-gradient(to right, #f0f9ff, #e6f3ff);">
            <img src="${logoUrl}" alt="${CONSTANTS.COMPANY_NAME} Logo" style="width: 200px; height: auto;">
        </div>`,

    mainContainer: (content) => `
        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            ${content}
        </div>`,

    footer: (spaceName = CONSTANTS.COMPANY_NAME) => `
        <div style="text-align: center; color: #64748b; font-size: 14px;">
            <p style="margin: 5px 0;">Follow us for updates:</p>
            <div style="margin: 10px 0;">
                <a href="#" style="color: #1e40af; text-decoration: none; margin: 0 10px;">LinkedIn</a>
                <a href="#" style="color: #1e40af; text-decoration: none; margin: 0 10px;">Twitter</a>
                <a href="#" style="color: #1e40af; text-decoration: none; margin: 0 10px;">Facebook</a>
            </div>
            <p style="margin: 15px 0;">© ${CONSTANTS.CURRENT_YEAR} ${spaceName}. All rights reserved.</p>
        </div>`,

    callToActionButton: (text, link, style = '') => `
        <div style="text-align: center; margin-top: 30px;">
            <a href="${link}" 
               style="background: linear-gradient(to right, #1e40af, #2563eb); color: white; 
                      padding: 12px 25px; text-decoration: none; border-radius: 5px; 
                      display: inline-block; transition: all 0.3s ease; ${style}">
                ${text}
            </a>
        </div>`,

    marketingSection: (title, content, buttonText, buttonLink) => `
        <div style="background: linear-gradient(to right, #f0f9ff, #e6f3ff); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-bottom: 10px;">${title}</h3>
            <p style="color: #334155; line-height: 1.6;">${content}</p>
            ${buttonText ? emailTemplates.callToActionButton(buttonText, buttonLink) : ''}
        </div>`
};

// Email Transport Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'clientsvoice.bhavesh@gmail.com',
        pass: 'eyrb eoer lygn uebj',    
    },
    tls: {
        rejectUnauthorized: false,
      },
});

// Core email sending function
const sendEmail = async (recipient, subject, message, spaceName = '') => {
    try {
        const fromField = spaceName ? 
            `"${spaceName}" <${recipient}>` : 
            `"${CONSTANTS.COMPANY_NAME}" <clientsvoice.bhavesh@gmail.com>`;

        await transporter.sendMail({
            from: fromField,
            to: recipient,
            subject: subject,
            html: message,
        });
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Email Service Functions
const emailService = {
    testimonialAddedEmail: async (client, space, testimonialFormData) => {
        // Owner notification email
        const ownerMessage = emailTemplates.baseContainer(`
            ${emailTemplates.header()}
            ${emailTemplates.mainContainer(`
              <h2 style="color: #2c5282; margin-bottom: 20px;">New Testimonial Alert! 🎉</h2>
              
              <p style="font-size: 16px; line-height: 1.6;">Dear ${client.name || 'Valued Client'},</p>
              
              <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #2c5282; margin: 20px 0;">
                <div style="margin-bottom: 15px;">
                  <strong>From:</strong> ${testimonialFormData.responses.email}<br>
                  <strong>Position:</strong> ${testimonialFormData.responses.position}
                </div>
                
                <div style="font-style: italic; color: #4a5568; margin-bottom: 20px;">
                  "${testimonialFormData.responses.testimonial || 'No content provided.'}"
                </div>
          
                <div style="margin: 20px 0; padding: 15px; background-color: #ebf8ff; border-radius: 5px;">
                  <p style="color: #2c5282; margin-bottom: 10px;">
                    <strong>✨ One-Click Website Publishing</strong>
                  </p>
                  <p style="color: #4a5568; margin-bottom: 15px;">
                    Love this testimonial? Click the button below to instantly add it to your website's testimonial section. No additional setup required!
                  </p>
                </div>
  
                <a href="http://localhost:5173/directLikeFromEmail.html?spaceId=${space._id}&testimonialId=${testimonialFormData._id}"
 
                   style="display: inline-block; 
                          background-color: #2c5282; 
                          color: #ffffff; 
                          padding: 12px 24px; 
                          text-decoration: none; 
                          border-radius: 5px;
                          font-weight: bold;
                          text-align: center;">
                  👍 Add to My Website
                </a>
              </div>
          
              ${testimonialFormData.ProfileImage ? `
                <div style="text-align: center; margin: 20px 0;">
                  <img src="${testimonialFormData.ProfileImage}" 
                       alt="Profile Image" 
                       style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
                </div>
              ` : ''}
          
              ${emailTemplates.callToActionButton('View Dashboard', '#')}
              ${emailTemplates.footer()}
            `)}
          `);

        // Appreciation email
        const appreciationMessage = emailTemplates.baseContainer(`
            ${emailTemplates.header(space.logo)}
            ${emailTemplates.mainContainer(`
                <h2 style="color: #2c5282; margin-bottom: 20px;">Thank You for Your Testimonial! 🌟</h2>
                <p style="font-size: 16px; line-height: 1.6;">Dear ${testimonialFormData.responses.name},</p>
                <div style="background-color: #f7fafc; padding: 20px; margin: 20px 0; line-height: 1.8;">
                    We truly appreciate you taking the time to share your experience with ${space.spaceName}. 
                    Your feedback helps us grow and improve our services.
                </div>
                <div style="text-align: center; margin: 30px 0;">
                    <div style="color: #4a5568; font-size: 16px;">
                        Best regards,<br>
                        <strong>${client.name}</strong><br>
                        ${space.spaceName}
                    </div>
                </div>
                ${emailTemplates.footer(space.spaceName)}
            `)}
        `);

        await Promise.all([
            sendEmail(client.email, 'New Testimonial Added!', ownerMessage),
            sendEmail(
                testimonialFormData.responses.email,
                `✨ Thank you for your valuable feedback | ${space.spaceName}`,
                appreciationMessage,
                space.spaceName
            )
        ]);
    },

    spaceUpdatesEmail: async (client, space, mode) => {
        const templates = {
            create: {
                subject: `🎉 Space "${space.spaceName}" Created Successfully`,
                action: 'created',
                marketing: {
                    title: '🚀 Unlock More Possibilities!',
                    content: 'Upgrade to our Premium plan to unlock advanced analytics, custom branding, and unlimited responses.',
                    buttonText: 'Explore Premium Features →',
                    buttonLink: '/pricing'
                }
            },
            edit: {
                subject: `✨ Space "${space.spaceName}" Updated Successfully`,
                action: 'updated',
                marketing: {
                    title: '💡 Need More Templates?',
                    content: 'Access our premium template library with 50+ professionally designed feedback forms.',
                    buttonText: 'View Premium Templates →',
                    buttonLink: '/templates'
                }
            },
            delete: {
                subject: `🔔 Space "${space.spaceName}" Deleted`,
                action: 'deleted',
                marketing: {
                    title: '🌟 Ready for a Fresh Start?',
                    content: 'Create a new space with our enhanced features and templates. Use code NEWSPACE for 20% off!',
                    buttonText: 'Create New Space →',
                    buttonLink: '/create-space'
                }
            }
        };

        const template = templates[mode];
        const message = emailTemplates.baseContainer(`
            ${emailTemplates.header()}
            ${emailTemplates.mainContainer(`
                <h2 style="color: #1e40af; margin-bottom: 20px; text-align: center;">
                    Space ${template.action.charAt(0).toUpperCase() + template.action.slice(1)} Successfully!
                </h2>
                <p style="font-size: 16px; line-height: 1.6;">Dear ${client.name},</p>
                <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #1e40af; margin: 20px 0;">
                    <p style="margin: 0; line-height: 1.8;">
                        Your space for <strong>${space.organizationName}</strong> has been successfully ${template.action}. 
                        ${mode !== 'delete' ? 
                            'You can now start collecting valuable insights from your customers.' : 
                            'All associated data has been removed from our system.'}
                    </p>
                </div>
                ${emailTemplates.marketingSection(
                    template.marketing.title,
                    template.marketing.content,
                    template.marketing.buttonText,
                    template.marketing.buttonLink
                )}
                ${mode !== 'delete' ? emailTemplates.callToActionButton('Access Dashboard →', '/dashboard') : ''}
                ${emailTemplates.footer()}
            `)}
        `);

        await sendEmail(client.email, `${template.subject} | ${CONSTANTS.COMPANY_NAME}`, message);
    },

    newUserRegisteredEmail: async (client) => {
        const message = emailTemplates.baseContainer(`
            ${emailTemplates.header()}
            ${emailTemplates.mainContainer(`
                <h2 style="color: #1e40af; margin-bottom: 20px; text-align: center;">
                    Welcome to ${CONSTANTS.COMPANY_NAME}! 🌟
                </h2>
                <p style="font-size: 16px; line-height: 1.6;">Dear ${client.name},</p>
                
                <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #1e40af; margin: 20px 0;">
                    <p style="margin: 0; line-height: 1.8;">
                        Thank you for joining ${CONSTANTS.COMPANY_NAME}! We're excited to help you leverage the power 
                        of customer feedback and testimonials to grow your business.
                    </p>
                </div>

                ${emailTemplates.marketingSection(
                    '🎁 Special Launch Offer!',
                    'Upgrade to Premium within the next 48 hours and get 30% off your first 3 months! Use code WELCOME30 at checkout.',
                    'Unlock Premium Features →',
                    '/pricing'
                )}

                ${emailTemplates.callToActionButton('Start Collecting Testimonials →', '/dashboard')}

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    <h4 style="color: #1e40af; margin-bottom: 15px;">🤝 Need Help?</h4>
                    <p style="color: #334155; line-height: 1.6;">
                        Our support team is ready to help you succeed. Contact us anytime at 
                        <a href="mailto:${CONSTANTS.SUPPORT_EMAIL}" style="color: #1e40af; text-decoration: none;">
                            ${CONSTANTS.SUPPORT_EMAIL}
                        </a>
                    </p>
                </div>

                ${emailTemplates.footer()}
            `)}
        `);

        await sendEmail(client.email, `🎉 Welcome to ${CONSTANTS.COMPANY_NAME}, ${client.name}!`, message);
    }
};

module.exports = emailService;