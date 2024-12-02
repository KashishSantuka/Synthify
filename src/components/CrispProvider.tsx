'use client';

import CrispChat from "./CrispChat";

const CrispProvider = () => {
    try {
        return <CrispChat />;
    } catch (error) {
        console.log(error);
        return null; // Render nothing or a fallback UI in case of an error
    }
};

export default CrispProvider;
