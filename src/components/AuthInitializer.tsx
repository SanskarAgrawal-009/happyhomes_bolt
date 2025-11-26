import { useAuthListener } from '../hooks/useAuthListener';

export default function AuthInitializer() {
    useAuthListener();
    return null;
}
