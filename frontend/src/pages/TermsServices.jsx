import React, { useEffect } from 'react';

const TermsServices = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="min-h-screen bg-[#0a192f] text-white flex justify-center py-10 px-6">
            <div className="max-w-5xl bg-gray-900 p-10 rounded-lg shadow-lg border border-gray-700">
                <h1 className="text-4xl font-bold text-[#ff4081] text-center mb-6">Terms & Services</h1>
                <p className="text-gray-400 text-center mb-6">Effective Date: [Insert Date]</p>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#ff4081]">1. Introduction</h2>
                    <p className="text-gray-300">Welcome to CURE Network. These Terms & Services govern your use of our platform. By accessing CURE Network, you agree to these terms.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#ff4081]">2. Eligibility</h2>
                    <ul className="list-disc pl-6 text-gray-300">
                        <li>Users must be at least 13 years old. If under 18, parental or guardian consent is required.</li>
                        <li>Users must provide accurate information during registration.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#ff4081]">3. Use of Services</h2>
                    <ul className="list-disc pl-6 text-gray-300">
                        <li>Users must use the platform lawfully.</li>
                        <li>No engagement in fraudulent or disruptive activities.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#ff4081]">4. Research Submissions</h2>
                    <ul className="list-disc pl-6 text-gray-300">
                        <li>All submitted research must be original.</li>
                        <li>Submission fees are non-refundable.</li>
                        <li>CURE reserves the right to accept or reject papers.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#ff4081]">5. Payments and Fees</h2>
                    <ul className="list-disc pl-6 text-gray-300">
                        <li>Submission fees are processed securely.</li>
                        <li>Fees are non-refundable unless otherwise stated.</li>
                        <li>CURE may update pricing at any time.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#ff4081]">6. Limitation of Liability</h2>
                    <ul className="list-disc pl-6 text-gray-300">
                        <li>CURE provides its Services "as is" without warranties.</li>
                        <li>We are not liable for losses resulting from the use of our platform.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#ff4081]">7. Account Termination</h2>
                    <ul className="list-disc pl-6 text-gray-300">
                        <li>We reserve the right to terminate accounts for violations of these Terms.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#ff4081]">8. Contact Us</h2>
                    <p className="text-gray-300">For any questions, contact us at:</p>
                    <p className="text-gray-400">Email: [Insert Contact Email]</p>
                    <p className="text-gray-400">Website: [Insert Website URL]</p>
                </section>
            </div>
        </div>
    );
};

export default TermsServices;