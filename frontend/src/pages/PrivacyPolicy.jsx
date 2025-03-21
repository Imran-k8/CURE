import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a192f] text-white flex justify-center py-12 px-6">
            <div className="max-w-4xl w-full bg-[#111827] p-12 rounded-xl shadow-xl border border-gray-800">
                <h1 className="text-3xl font-bold text-white text-center mb-4">Privacy Policy</h1>
                <p className="text-gray-400 text-center mb-10 text-sm">Effective Date: [Insert Date]</p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">1. Introduction</h2>
                    <p className="text-gray-300 leading-relaxed">Welcome to CURE Network ("CURE," "we," "our," "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our website, platform, and services (collectively, the "Services").</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">2. Information We Collect</h2>
                    <p className="text-gray-300 mb-2 leading-relaxed">We may collect and process the following types of information:</p>
                    <ul className="list-disc pl-6 text-gray-400 space-y-1">
                        <li><strong className="text-white">Personal Information:</strong> Name, email, affiliation, research interests, payment details.</li>
                        <li><strong className="text-white">Non-Personal Information:</strong> IP address, browser type, device information, cookies.</li>
                        <li><strong className="text-white">User-Generated Content:</strong> Research submissions, peer review comments.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">3. How We Use Your Information</h2>
                    <p className="text-gray-300 mb-2 leading-relaxed">We use collected information to:</p>
                    <ul className="list-disc pl-6 text-gray-400 space-y-1">
                        <li>Provide and improve our Services</li>
                        <li>Facilitate research submissions and peer review</li>
                        <li>Process payments securely</li>
                        <li>Communicate with users regarding submissions, updates, and support</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">4. Data Security</h2>
                    <p className="text-gray-300 leading-relaxed">We implement industry-standard security measures to protect your information. However, no method of transmission or storage is 100% secure. We encourage users to take necessary precautions when sharing information online.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">5. Your Rights & Choices</h2>
                    <p className="text-gray-300 mb-2 leading-relaxed">You may have the right to:</p>
                    <ul className="list-disc pl-6 text-gray-400 space-y-1">
                        <li>Access, update, or delete your personal information</li>
                        <li>Withdraw consent for data processing</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Request a copy of the data we hold about you</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold text-white mb-2">6. Contact Us</h2>
                    <p className="text-gray-300 leading-relaxed">If you have any questions or concerns about this Privacy Policy, you can contact us at:</p>
                    <p className="text-gray-400 mt-2">Email: [Insert Contact Email]</p>
                    <p className="text-gray-400">Website: [Insert Website URL]</p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;