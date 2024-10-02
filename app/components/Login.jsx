"use client"; // Ensure this is a Client Component

import { signIn } from 'next-auth/react';

export default function Login() {
    const handleLogin = () => {
        signIn('google'); // This triggers the Google login
    };

    return (
        <div style={{ textAlign: 'center', margin: '2rem' }}>
            <h1>Login to Your YouTube Account</h1>
            <p>Please log in to view your uploaded YouTube videos.</p>
            <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                Log in with Google
            </button>
        </div>
    );
}
