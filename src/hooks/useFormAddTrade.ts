import React, { createContext, useContext, useState, ReactNode } from 'react';

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

/**
 * Provides a context for form data and submission handling.
 * @param children The child components to render.
 */
export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
        await submitFormData(formData);
        setIsSubmitted(true);
        } catch (error) {
        console.error('Error submitting form data:', error);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <FormContext.Provider value={{ formData, setFormData, handleSubmit, isSubmitted, isLoading }}>
            {children}
        </FormContext.Provider>
    );
};

const submitFormData = async (formData: { [key: string]: string }): Promise<Response> => {
    const url = '/api/graphQL/forms/SubmitFormData';

    try {
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            formData,
        }),
    });

    const data = await response.json();
    return JSON.parse(data); 
    } catch (error: string) {
        console.error('Error submitting form data:', error);
        return error;
    }
};

// #region types
type FormContextType = {
    formData: { [key: string]: string };
    setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitted: boolean;
    isLoading: boolean;
};

type FormProviderProps = {
    children: ReactNode;
};

// #endregion