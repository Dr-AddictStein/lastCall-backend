import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: "codingjedi048@gmail.com",
        pass: "fibu hrre zlfz tsuu",
    },
});

export const sendWelcomeEmail = async (to, fullName) => {
    console.log("Here : SEND: ", to);
    const subject = "Thank You for Joining the BookedPlus Waitlist!";
    const emailContent = `
    <p>Dear ${fullName},</p>
    <p>Thank you for joining the BookedPlus waitlist! We're excited to have you on board and appreciate your interest in our platform.</p>
    <p>By signing up, you have automatically enrolled in a 3-month free trial of BookedPlus at the time of our release. Additionally, you now have a chance to win a 6-month free trial if selected from our random poll. On the release date, we will choose 10 lucky waitlist members for this special offer.</p>
    <p>We look forward to providing you with a seamless and efficient online catering reservation experience. In the meantime, feel free to <a href="https://bookedplus.com/blogs">visit BookedPlus Learn</a> where we regularly post blogs about the benefits of switching to an online reservation platform while still keeping phone reservations available.</p>
    <p>Thank you once again for your support. If you have any questions, please don't hesitate to reach out.</p>
    <p>Best regards,</p>
    <p>Faraz</p>
    <p>Founder, BookedPlus</p>
  `;

    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"BookedPlus" <your-email@gmail.com>',
            to: to,
            subject: subject,
            html: emailContent,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export const notifyAdminMail = async (to, data) => {
    console.log("HERE DATA<<<", to, data)
    const subject = "New Restaurant.!.";
    const emailContent = `
    <p>Dear Admin,</p>
    <p>A new restaurant owner has submitted form for registering their restaurant.</p>
    <p>Here are the details:</p>
    <p><strong>Restaurant Name: </strong>${data.restaurantName}</p>
    <p><strong>City: </strong>${data.city}</p>
    <p><strong>Region: </strong>${data.region}</p>
    <p><strong>Restaurant Owner Name: </strong>${data.firstName + ' ' + data.lastName}</p>
    <p><strong>Restaurant Owner Mail: </strong>${data.email}</p>
    <p><strong>Restaurant Owner Phone: </strong>${data.phoneNumber}</p>
    <p>Now, you may contact them through the info provided above and keep expanding our business...</p>
    <p>Best regards,</p>
    <p>Last Call Mail System</p>
  `;

    try {
        let info = await transporter.sendMail({
            from: '"Last Call" <your-email@gmail.com>',
            to: to,
            subject: subject,
            html: emailContent,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
export const contactAdminMail = async (to, data) => {
    console.log("HERE DATA<<<", to, data)
    const subject = "Someone Contacted You from the Contact Us Page.";
    const emailContent = `
    <p>Dear Admin,</p>
    <p>Someone Contacted You from the Contact Us Page.</p>
    <p>Here are the details:</p>
    <p><strong>First Name: </strong>${data.firstName}</p>
    <p><strong>Last Name: </strong>${data.lastName}</p>
    <p><strong>Email: </strong>${data.email}</p>
    <p><strong>Phone: </strong>${data.phone}</p>
    <p><strong>City: </strong>${data.city}</p>
    <p><strong>Message: </strong>${data.message}</p>
    <p>Now, you may contact them through the info provided above and keep expanding our business...</p>
    <p>Best regards,</p>
    <p>Last Call Mail System</p>
  `;

    try {
        let info = await transporter.sendMail({
            from: '"Last Call" <your-email@gmail.com>',
            to: to,
            subject: subject,
            html: emailContent,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
export const suggestAdminMail = async (to, data) => {
    console.log("HERE DATA<<<", to, data)
    const subject = "Someone Suggested a Restaurant.";
    const emailContent = `
    <p>Dear Admin,</p>
    <p>Someone Suggested a Restaurant.</p>
    <p>Here are the details:</p>
    <p><strong>First Name: </strong>${data.firstName}</p>
    <p><strong>Last Name: </strong>${data.lastName}</p>
    <p><strong>Email: </strong>${data.email}</p>
    <p><strong>Phone: </strong>${data.phone}</p>
    <p><strong>City: </strong>${data.city}</p>
    <p><strong>Restaurant Name: </strong>${data.restaurant}</p>
    <p>Now, you may contact them through the info provided above and keep expanding our business...</p>
    <p>Best regards,</p>
    <p>Last Call Mail System</p>
  `;

    try {
        let info = await transporter.sendMail({
            from: '"Last Call" <your-email@gmail.com>',
            to: to,
            subject: subject,
            html: emailContent,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};


export const notifyRestaurantAdminMail = async ( name, email, password) => {
    console.log("HERE DATA<<<", name,email,password)
    const subject = "Your Restaurant has been verified.!.";
    const emailContent = `
    <p>Dear ${name},</p>
    <p>Your Restaurant has been verified by the Last Call Management.</p>
    <p>Here are your login Credentials:</p>
    <p><strong>Email: </strong>${email}</p>
    <p><strong>Password: </strong>${password}</p>
    <p>You can and recommended to change your password anytime from the profile page of Last Call Website.</p>
    <p>Best regards,</p>
    <p>Last Call Mail System</p>
  `;

    try {
        let info = await transporter.sendMail({
            from: '"Last Call" <your-email@gmail.com>',
            to: email,
            subject: subject,
            html: emailContent,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
