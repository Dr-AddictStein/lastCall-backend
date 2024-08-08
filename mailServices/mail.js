import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: "reservations@lastcall.co",
        pass: "ptdl jnyp qhuq srph",
    },
});




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
export const notifyBookerMail = async ( data) => {
    console.log("HERE DATA<<<",  data)
    const subject = `Your Booking Has been Confirmed in ${data.restaurant.name}`;
    const emailContent = `
    <p>Dear ${data.reservedFor},</p>
    <p>Your Booking Has been Confirmed in ${data.restaurant.name}.</p>
    <p>Here are the details:</p>
    <p><strong>Time: </strong>${data.time}</p>
    <p><strong>Date: </strong>${data.date}</p>
    <p><strong>Number of People: </strong>${data.people}</p>
    <p><strong>Table Type: </strong>${data.tableType}</p>

    <p>Best regards,</p>
    <p>Last Call Mail System</p>
  `;

    try {
        let info = await transporter.sendMail({
            from: '"Last Call" <your-email@gmail.com>',
            to: data.reservedForMail,
            subject: subject,
            html: emailContent,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
export const notifyBookingAdminMail = async (to, data) => {
    console.log("HERE DATA<<<",  data)
    const subject = `A new Booking Has been Confirmed in ${data.restaurant.name}`;
    const emailContent = `
    <p>Dear Admin,</p>
    <p>A new Booking Has been Confirmed in ${data.restaurant.name}.</p>
    <p>Here are the details:</p>
    <p><strong>Time: </strong>${data.time}</p>
    <p><strong>Date: </strong>${data.date}</p>
    <p><strong>Number of People: </strong>${data.people}</p>
    <p><strong>Table Type: </strong>${data.tableType}</p>
    <p><strong>Booker Name: </strong>${data.reservedFor}</p>
    <p><strong>Booker Email: </strong>${data.reservedForMail}</p>
    <p><strong>Booker Phone: </strong>${data.reservedForPhone}</p>

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
export const notifyRestaurantEmployeeMail = async ( name, email, password) => {
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
