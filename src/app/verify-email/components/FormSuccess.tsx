
interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({message}: FormSuccessProps) => {
    if (!message) return null;
    return (
        <div className="flex space-x-4 items-center p-2 rounded-lg text-emerald-500 bg-emerald-500/30">
        
        <p>{message}</p>
    </div> 
    )
}