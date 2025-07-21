import React from "react";


function Home() {
    return (
        <main className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen py-10 px-4 md:px-12">
            <div className="max-w-5xl mx-auto space-y-10">
                {/* Header */}
                <section className="text-center space-y-2">
                    <h1 className="text-4xl font-bold">🛍️ Full-Stack E-commerce Application</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Scalable and modern e-commerce platform with Spring Boot, React & AWS.
                    </p>
                </section>

                {/* Overview */}
                <section>
                    <h2 className="text-2xl font-semibold mb-3">📌 Overview</h2>
                    <p>
                        A full-featured e-commerce website supporting product browsing, secure checkout,
                        user authentication, payment integration, and cloud deployment.
                    </p>
                </section>

                {/* Features */}
                <section>
                    <h2 className="text-2xl font-semibold mb-3">🎯 Core Features</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>JWT-based User Authentication</li>
                        <li>Product Listing & Filtering</li>
                        <li>Shopping Cart & Checkout</li>
                        <li>Stripe Payment Gateway</li>
                        <li>Responsive React UI</li>
                        <li>Spring Boot REST API</li>
                        <li>Dockerized Microservices</li>
                        <li>AWS Deployment with CI/CD</li>
                    </ul>
                </section>

                {/* Tech Stack */}
                <section>
                    <h2 className="text-2xl font-semibold mb-3">🛠 Tech Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h3 className="font-medium mb-1">🔙 Backend</h3>
                            <ul className="text-sm list-disc list-inside">
                                <li>Java 17 + Spring Boot</li>
                                <li>PostgreSQL + JPA</li>
                                <li>Spring Security + JWT</li>
                                <li>Stripe SDK</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-1">🔜 Frontend</h3>
                            <ul className="text-sm list-disc list-inside">
                                <li>React.js + Axios</li>
                                <li>React Router</li>
                                <li>Tailwind CSS</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-1">🚀 Deployment</h3>
                            <ul className="text-sm list-disc list-inside">
                                <li>AWS EC2, S3, RDS</li>
                                <li>GitHub Actions</li>
                                <li>Docker + Compose</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Quick Start */}
                <section>
                    <h2 className="text-2xl font-semibold mb-3">⚡ Quick Start</h2>
                    <p className="text-sm mb-2">Clone the repository:</p>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
            git clone https://github.com/herinp45/fullstack-ecommerce.git
          </pre>
                </section>

                {/* Contact */}
                <section>
                    <h2 className="text-2xl font-semibold mb-3">📬 Contact</h2>
                    <p className="text-sm">For issues or contributions, open a GitHub issue or contact <span className="font-medium">herinp45</span>.</p>
                </section>
            </div>
        </main>
    );
}

export default Home;