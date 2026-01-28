"use client";

import { useState, useEffect } from "react";

export function useConsent() {
    const [consentGiven, setConsentGiven] = useState(false);
    const [hasActionTaken, setHasActionTaken] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("proofa_cookie_consent");
        if (consent === "accepted") {
            setConsentGiven(true);
            setHasActionTaken(true);
        } else if (consent === "declined") {
            setConsentGiven(false);
            setHasActionTaken(true);
        } else {
            setConsentGiven(false);
            setHasActionTaken(false);
        }

        // Listen for storage changes in case it's updated in another tab/component
        const handleStorageChange = () => {
            const newConsent = localStorage.getItem("proofa_cookie_consent");
            if (newConsent === "accepted") {
                setConsentGiven(true);
                setHasActionTaken(true);
            } else if (newConsent === "declined") {
                setConsentGiven(false);
                setHasActionTaken(true);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        // Custom event for same-window updates
        window.addEventListener("proofa-consent-updated", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("proofa-consent-updated", handleStorageChange);
        };
    }, []);

    return { consentGiven, hasActionTaken };
}
