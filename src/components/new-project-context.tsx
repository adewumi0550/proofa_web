"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface NewProjectContextType {
    isOpen: boolean;
    openNewProjectModal: () => void;
    closeNewProjectModal: () => void;
}

const NewProjectContext = createContext<NewProjectContextType | undefined>(undefined);

export function NewProjectProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openNewProjectModal = () => setIsOpen(true);
    const closeNewProjectModal = () => setIsOpen(false);

    return (
        <NewProjectContext.Provider value={{ isOpen, openNewProjectModal, closeNewProjectModal }}>
            {children}
        </NewProjectContext.Provider>
    );
}

export function useNewProject() {
    const context = useContext(NewProjectContext);
    if (context === undefined) {
        throw new Error("useNewProject must be used within a NewProjectProvider");
    }
    return context;
}
