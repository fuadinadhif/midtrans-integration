# Midtrans Payment Gateway Integration Into Next.js & Express.js Application

## Prerequisite

You need Midtrans account before running this project. After completing the sign up process, please input your Midtrans credentials into the environment variables `.env` file, both on the `web` and `api` folder. Follow the formats provided in the `.env.example` files.

## Installation

1. Install Frontend Dependencies

   ```bash
   cd /web
   npm install
   ```

2. Install Backend Dependencies

   ```bash
   cd /api
   npm install
   ```

3. Setup Prisma

   ```bash
   cd /api
   npx prisma generate
   npx prisma db push
   ```

4. Install Ngrok

   Visit [Ngrok documentation](https://ngrok.com/download) for further details

## Running The Project

1.  Run Both Frontend and Backend

    ```bash
    cd /web
    npm run dev

    cd /api
    npm run dev
    ```

2.  Run Prisma Studio

    ```bash
    cd /api
    npx prisma Studio
    ```

3.  Serve the Backend on Ngrok
    ```bash
    ngrok config <your_token_here>
    ngrok http http://localhost:8000
    ```
4.  Submit Ngrok forward link into Midtrans Notification URL Setup

    [Midtrans link](https://dashboard.sandbox.midtrans.com/settings/payment/notification). **DO NOT TEST THE URL**, it may cause some error. Just save it directly.

## Note

It just a simple integration without proper UI/UX. To get the Item ID you need to copy it directly from the database using your preferred ways or just use Prisma Studio.
