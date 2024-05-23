const fetch = require('node-fetch');
const cron = require('node-cron');

const API_URL = 'http://localhost:3000/api/processEmails';

// Schedule the task to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
        });
        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Failed to process emails:', error);
    }
});

console.log('Scheduler started. Running every 5 minutes.');

