import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaUserTie, FaLightbulb } from 'react-icons/fa';

const parseSections = (raw) => {
    // Try to split the AI response into roles and improvements
    const rolesMatch = raw.match(/good fit for these roles:(.*?)(Improvements:|$)/is);
    const improvementsMatch = raw.match(/Improvements:(.*)/is);
    const roles = rolesMatch ? rolesMatch[1].replace(/because:/i, '').trim() : '';
    const improvements = improvementsMatch ? improvementsMatch[1].trim() : '';
    return { roles, improvements };
};

const TabButton = ({ active, onClick, children }) => (
    <button
        className={`px-4 py-2 rounded-t-lg font-semibold transition-all duration-200 focus:outline-none ${active ? 'bg-white/80 text-blue-700 shadow' : 'bg-white/40 text-gray-500 hover:bg-white/60'}`}
        onClick={onClick}
        type="button"
    >
        {children}
    </button>
);

const JobRecommendation = ({ data }) => {
    if (!data) return null;

    const { skills, experience_summary, desired_roles, raw } = data;
    const [tab, setTab] = useState('roles');
    const { roles, improvements } = parseSections(raw || '');

    return (
        <div className="mt-10 p-0 bg-white/30 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 animate-fade-in">
            <div className="flex items-center gap-3 px-6 pt-6">
                <FaUserTie className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">AI Recommendation</h2>
            </div>
            <div className="flex mt-4 border-b border-white/30 px-6">
                <TabButton active={tab === 'roles'} onClick={() => setTab('roles')}>
                    <FaUserTie className="inline mr-2" /> Roles
                </TabButton>
                <TabButton active={tab === 'improvements'} onClick={() => setTab('improvements')}>
                    <FaLightbulb className="inline mr-2" /> Improvements
                </TabButton>
            </div>
            <div className="px-6 pb-6 pt-4">
                {tab === 'roles' && (
                    <div className="prose max-w-none text-gray-800">
                        <ReactMarkdown>{roles || 'No roles found.'}</ReactMarkdown>
                    </div>
                )}
                {tab === 'improvements' && (
                    <div className="prose max-w-none text-gray-800">
                        <ReactMarkdown>{improvements || 'No improvements found.'}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobRecommendation;
