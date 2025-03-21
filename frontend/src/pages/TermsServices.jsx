import React, { useEffect } from 'react';

const TermsServices = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a192f] text-white flex justify-center py-12 px-6">
            <div className="max-w-4xl w-full bg-[#111827] p-12 rounded-xl shadow-xl border border-gray-800">
                <h1 className="text-3xl font-bold text-white text-center mb-4">Terms & Services</h1>
                <p className="text-gray-400 text-center mb-10 text-sm">Effective Date: [Insert Date]</p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">1. Introduction</h2>
                    <p className="text-gray-300 leading-relaxed">Welcome to CURE Network. These Terms & Services govern your use of our platform. By accessing CURE Network, you agree to these terms.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">2. Eligibility</h2>
                    <ul className="list-disc pl-6 text-gray-400 space-y-1">
                        <li>Users must be at least 13 years old. If under 18, parental or guardian consent is required.</li>
                        <li>Users must provide accurate information during registration.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">3. Use of Services</h2>
                    <ul className="list-disc pl-6 text-gray-400 space-y-1">
                        <li>Users must use the platform lawfully.</li>
                        <li>No engagement in fraudulent or disruptive activities.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">4. Research Submissions</h2>
                    <ul className="list-disc pl-6 text-gray-400 space-y-1">
                        <li>All submitted research must be original.</li>
                        <li>Submission fees are non-refundable.</li>
                        <li>CURE reserves the right to accept or reject papers.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">5. Payments and Fees</h2>
                    <ul className="list-disc pl-6 text-gray-400 space-y-1">
                        <li>Submission fees are processed securely.</li>
                        <li>Fees are non-refundable unless otherwise stated.</li>
                        <li>CURE may update pricing at any time.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">6. Limitation of Liability</h2>
                    <ul className="list-disc pl-6 text-gray-400 space-y-1">
                        <li>CURE provides its Services "as is" without warranties.</li>
                        <li>We are not liable for losses resulting from the use of our platform.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-2">7. Account Termination</h2>
                    <ul className="list-disc pl-6 text-gray-400 space-y-1">
                        <li>We reserve the right to terminate accounts for violations of these Terms.</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold text-white mb-2">8. Contact Us</h2>
                    <p className="text-gray-300 leading-relaxed">For any questions, contact us at:</p>
                    <p className="text-gray-400 mt-2">Email: [Insert Contact Email]</p>
                    <p className="text-gray-400">Website: [Insert Website URL]</p>
                </section>
            </div>
        </div>
    );
};

export default TermsServices;
