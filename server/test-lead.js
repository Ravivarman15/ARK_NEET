
import fetch from 'node-fetch';

const API_URL = 'http://localhost:4000/api/leads/free-kit';

async function testLeadCapture() {
    console.log('Testing Lead Capture API...');
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                class: 'class-12'
            })
        });

        const data = await response.json();
        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

testLeadCapture();
