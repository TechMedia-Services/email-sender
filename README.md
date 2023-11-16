# Email Sender using Nodemailer

This Node.js script utilizes the Nodemailer library to send HTML emails to recipients listed in a `clients.json` file.

## Description

This script reads recipient details (name, email, website) from a JSON file (`clients.json`). It uses environment variables configured in a `.env` file for SMTP configuration and email content.

## Prerequisites

To run this code, ensure you have:

- Node.js installed
- `nodemailer` and `dotenv` npm packages installed (`npm install nodemailer dotenv`)

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables in a `.env` file:
    - `SMTP_EMAIL_HOST`: SMTP server host
    - `SMTP_EMAIL_PORT`: SMTP port
    - `SMTP_EMAIL_USER`: SMTP email user
    - `SMTP_EMAIL_PASS`: SMTP email password
    - `EMAIL_ADDRESS`: Sender's email address
    - `EMAIL_NAME`: Sender's name
    - `EMAIL_PHONE`: Sender's phone number
    - `EMAIL_SUBJECT`: Subject line for the email

## Usage

1. Populate the `clients.json` file with recipient details (name, email, website).
2. Run the script using `node script.js`.

## Features

- Sends personalized HTML emails to recipients.
- Validates entries in `clients.json` for email and website information before sending emails.
- Logs successful email deliveries and errors if any occur.

## Notes

- Ensure the `clients.json` file follows the expected structure (`[{ "name": "", "email": "", "website": "" }, ...]`).

## License

This project is licensed under [MIT License](LICENSE).

---
