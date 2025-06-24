import React from 'react';

const JobRecommendation = ({ data }) => {
    if (!data) return null;

    const { skills, experience_summary, desired_roles, raw } = data;

    return (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recommended Jobs:</h2>

            {skills && skills.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Skills:</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {experience_summary && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Experience Summary:</h3>
                    <p className="text-gray-600">{experience_summary}</p>
                </div>
            )}

            {desired_roles && desired_roles.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Suggested Job Roles:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        {desired_roles.map((role, index) => (
                            <li key={index}>{role}</li>
                        ))}
                    </ul>
                </div>
            )}

            {raw && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">AI Response:</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{raw}</p>
                </div>
            )}
        </div>
    );
};

export default JobRecommendation;
