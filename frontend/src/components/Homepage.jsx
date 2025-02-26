import React from "react";
import FeatureCard from "./FeatureCard";

const Homepage = () => {
    return (
        <div className="w-full min-h-screen bg-black text-white">
           
            <section
                className="relative h-[500px] bg-cover bg-center flex items-center justify-center text-center"
                style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?coding,technology')` }}
                role="img"
                aria-label="Coding and Technology Background"
            >
                <div className="bg-black bg-opacity-70 p-6 rounded-lg text-center">
                    <h1 className="text-4xl font-extrabold">Track & Analyze Your Progress</h1>
                    <p className="text-lg mt-2">Monitor your coding journey across multiple platforms</p>

                    {/* Platform Logos */}
                    <div className="flex justify-center gap-6 mt-4">
                        <img className="h-12 w-12" src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" alt="LeetCode" />
                        <img className="h-15 w-15" src="https://media.geeksforgeeks.org/gfg-gg-logo.svg" alt="GeeksforGeeks" />
                        <img className="h-12 w-15" src="https://cdn.codechef.com/images/cc-logo.svg" alt="CodeChef"></img>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6">
                <h2 className="text-3xl font-bold text-center mb-8 text-white">What Our Platform Can Do</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <FeatureCard
                        title="Track Your Progress"
                        description="Monitor solved problems across LeetCode, GeeksForGeeks, and more."
                    />

                    <FeatureCard
                        title="Analyze Performance"
                        description="Detailed insights into your strengths and weaknesses."
                    />

                    <FeatureCard
                        title="Compete & Collaborate"
                        description="Compare your stats with friends & improve together."
                    />
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-10 bg-orange-400 text-black">
                <h2 className="text-3xl font-bold">Start Tracking Today!</h2>
                <p className="mt-2">Join now and take control of your coding journey.</p>
            </section>
        </div>
    );
};

export default Homepage;
