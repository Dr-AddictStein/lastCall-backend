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

///////// YO ARNAB, PLEASE ADD A HYPERLINK TO LASTCALL.CO AT THE END OF EVERY EMAIL
//////// THANK YOU BOSS!!!!



export const notifyAdminMail = async (to, data) => {
    console.log("HERE DATA<<<", to, data)
    const subject = "Restaurant Sign Up";
    const emailContent = `
    <p>Dear Admin,</p>
    <p>A restaurant owner has submitted the form for registering their restaurant.</p>
    <p>Here are the details:</p>
    <p><strong>Restaurant Name: </strong>${data.restaurantName}</p>
    <p><strong>City: </strong>${data.city}</p>
    <p><strong>Region: </strong>${data.region}</p>
    <p><strong>Restaurant Owner Name: </strong>${data.firstName + ' ' + data.lastName}</p>
    <p><strong>Restaurant Owner Mail: </strong>${data.email}</p>
    <p><strong>Restaurant Owner Phone: </strong>${data.phoneNumber}</p>
    <p>You may contact them through the info provided above and keep expanding our business.</p>
    <p>Best regards,</p>
    <p>Last Call Mail</p>
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
    const subject = "Contact Us";
    const emailContent = `
    <p>Dear Admin,</p>
    <p>Someone contacted you from the Contact Us page.</p>
    <p>Here are the details:</p>
    <p><strong>First Name: </strong>${data.firstName}</p>
    <p><strong>Last Name: </strong>${data.lastName}</p>
    <p><strong>Email: </strong>${data.email}</p>
    <p><strong>Phone: </strong>${data.phone}</p>
    <p><strong>City: </strong>${data.city}</p>
    <p><strong>Message: </strong>${data.message}</p>
    <p>You may contact them through the info provided above and keep expanding our business.</p>
    <p>Best regards,</p>
    <p>Last Call Mail</p>
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
    const subject = "Suggest a Restaurant";
    const emailContent = `
    <p>Dear Admin,</p>
    <p>Someone contacted you from the Suggest a Restaurant page.</p>
    <p>Here are the details:</p>
    <p><strong>First Name: </strong>${data.firstName}</p>
    <p><strong>Last Name: </strong>${data.lastName}</p>
    <p><strong>Email: </strong>${data.email}</p>
    <p><strong>Phone: </strong>${data.phone}</p>
    <p><strong>City: </strong>${data.city}</p>
    <p><strong>Restaurant Name: </strong>${data.restaurant}</p>
    <p>You may contact them through the info provided above and keep expanding our business.</p>
    <p>Best regards,</p>
    <p>Last Call Mail</p>
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
    const subject = `Last Call - Reservation Confirmed at ${data.restaurant.name}`;
    const emailContent = `
    <p>Dear ${data.reservedFor},</p>
    <p>Your reservation Has been confirmed at ${data.restaurant.name}.</p>
    <p>Here are the details:</p>
    <p><strong>Time: </strong>${data.time}</p>
    <p><strong>Date: </strong>${data.date}</p>
    <p><strong>Number of People: </strong>${data.people}</p>
    <p><strong>Table Type: </strong>${data.tableType}</p>

    <p>Best regards,</p>
    <p>Last Call Reservations</p>
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
    const subject = `Last Call - Reservation Confirmed at ${data.restaurant.name}`;
    const emailContent = `
    <p>Dear Admin,</p>
    <p>A new reservation has been confirmed at ${data.restaurant.name}.</p>
    <p>Here are the details:</p>
    <p><strong>Time: </strong>${data.time}</p>
    <p><strong>Date: </strong>${data.date}</p>
    <p><strong>Number of People: </strong>${data.people}</p>
    <p><strong>Table Type: </strong>${data.tableType}</p>
    <p><strong>Reservation Name: </strong>${data.reservedFor}</p>
    <p><strong>Reservation Email: </strong>${data.reservedForMail}</p>
    <p><strong>Reservation Phone: </strong>${data.reservedForPhone}</p>

    <p>Best regards,</p>
    <p>Last Call Reservations</p>
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
    const subject = "Last Call - Restaurant Registration";
    const emailContent = `
    <p>Dear ${name},</p>
    <p>Your restaurant has been verified by Last Call management.</p>
    <p>Here are your login credentials:</p>
    <p><strong>Email: </strong>${email}</p>
    <p><strong>Password: </strong>${password}</p>
    <p>Please update your password from your profile page on our website.</p>
    
    <p>Best regards,</p>
    <p>Last Call Mail</p>
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
    const subject = "Last Call - Employee Registration";
    const emailContent = `
    <p>Dear ${name},</p>
    <p>Your employee status has been verified by Last Call management. Enjoy an additional 50% off all reservation fees!</p>
    <p>Here are your login Credentials:</p>
    <p><strong>Email: </strong>${email}</p>
    <p><strong>Password: </strong>${password}</p>
    <p>Please update your password from your profile page on our website.</p>
    
    <p>Best regards,</p>
    <p>Last Call Mail</p>
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
