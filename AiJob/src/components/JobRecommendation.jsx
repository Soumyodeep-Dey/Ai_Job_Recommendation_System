import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaUserTie, FaLightbulb, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const parseSections = (raw) => {
    // Try to split the AI response into roles and improvements
    const rolesMatch = raw.match(/good fit for these roles:(.*?)(Improvements:|$)/is);
    const improvementsMatch = raw.match(/Improvements:(.*)/is);
    const roles = rolesMatch ? rolesMatch[1].replace(/because:/i, '').trim() : '';
    const improvements = improvementsMatch ? improvementsMatch[1].trim() : '';
    return { roles, improvements };
};

const TabButton = ({ active, onClick, children, icon }) => (
    <button
        className={`flex items-center gap-2 px-5 py-2 rounded-t-xl font-semibold transition-all duration-200 focus:outline-none border-b-2 ${
            active
                ? 'bg-white/90 text-blue-700 border-blue-500 shadow-lg'
                : 'bg-white/40 text-gray-500 border-transparent hover:bg-white/60'
        }`}
        onClick={onClick}
        type="button"
    >
        {icon}
        {children}
    </button>
);

const JobRecommendation = ({ data }) => {
    if (!data) return null;

    const { skills, experience_summary, desired_roles, raw } = data;
    const [tab, setTab] = useState('roles');
    const { roles, improvements } = parseSections(raw || '');

    return (
        <div className="mt-10 p-0 bg-gradient-to-br from-white/80 via-blue-50 to-purple-50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 animate-fade-in overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-8 pt-8 pb-2">
                <FaUserTie className="text-3xl text-blue-600 drop-shadow" />
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">AI Recommendation</h2>
            </div>
            {/* Experience Summary */}
            {experience_summary && (
                <div className="px-8 pt-2 pb-2">
                    <div className="bg-blue-100/60 rounded-lg px-4 py-2 mb-2 flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-gray-700 font-medium">{experience_summary}</span>
                    </div>
                </div>
            )}
            {/* Skills Badges */}
            {skills && skills.length > 0 && (
                <div className="px-8 pb-2 flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                        <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-200 to-purple-200 text-blue-900 rounded-full text-xs font-semibold shadow hover:scale-105 transition"
                        >
                            <FaArrowRight className="text-blue-400" />
                            {skill}
                        </span>
                    ))}
                </div>
            )}
            {/* Tabs */}
            <div className="flex mt-4 border-b border-white/40 px-8">
                <TabButton
                    active={tab === 'roles'}
                    onClick={() => setTab('roles')}
                    icon={<FaUserTie className="inline" />}
                >
                    Roles
                </TabButton>
                <TabButton
                    active={tab === 'improvements'}
                    onClick={() => setTab('improvements')}
                    icon={<FaLightbulb className="inline" />}
                >
                    Improvements
                </TabButton>
            </div>
            {/* Tab Content */}
            <div className="px-8 pb-8 pt-4 min-h-[120px] transition-all duration-300">
                {tab === 'roles' && (
                    <div className="prose max-w-none text-gray-800 animate-fade-in">
                        <ReactMarkdown>{roles || 'No roles found.'}</ReactMarkdown>
                    </div>
                )}
                {tab === 'improvements' && (
                    <div className="prose max-w-none text-gray-800 animate-fade-in">
                        <ReactMarkdown>{improvements || 'No improvements found.'}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobRecommendation;
