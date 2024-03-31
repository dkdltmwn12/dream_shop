import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useAuthContext } from '../components/context/AuthContext';
import { addCart, deleteCarts, getCarts } from '../api/firebase';

export default function useCarts() {
    const {uid} = useAuthContext();
    const queryClient = useQueryClient();
    
    const cartsGetQuery = useQuery(['carts', uid || ''], () => getCarts(uid), {
        enabled: !!uid
    });
    const cartsCountAndSetQuery = useMutation((cart) => addCart(uid, cart),
        {
            onSuccess: () => queryClient.invalidateQueries(['carts', uid])
        }
    );
    const cartsDeleteQuery = useMutation((id) => deleteCarts(uid, id), 
        {
            onSuccess: () => queryClient.invalidateQueries(['carts', uid])
        }
    );
    return {cartsGetQuery, cartsCountAndSetQuery, cartsDeleteQuery}
}