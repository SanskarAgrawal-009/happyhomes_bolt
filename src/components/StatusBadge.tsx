interface StatusBadgeProps {
    status: 'open' | 'in-progress' | 'completed' | 'cancelled' | 'pending' | 'accepted' | 'rejected' | 'withdrawn';
    className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
    const getStatusStyles = () => {
        switch (status) {
            case 'open':
                return 'bg-pastel-purple-light text-pastel-purple-dark border-pastel-purple';
            case 'in-progress':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'completed':
                return 'bg-pastel-green-light text-pastel-green-dark border-pastel-green';
            case 'cancelled':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'pending':
                return 'bg-pastel-purple-light text-pastel-purple-dark border-pastel-purple';
            case 'accepted':
                return 'bg-pastel-green-light text-pastel-green-dark border-pastel-green';
            case 'rejected':
                return 'bg-pastel-red-light text-pastel-red-dark border-pastel-red';
            case 'withdrawn':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatStatus = (status: string) => {
        return status.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()} ${className}`}>
            {formatStatus(status)}
        </span>
    );
}
