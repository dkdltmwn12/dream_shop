import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { getProducts as fetchProducts, uploadProduct,  } from '../api/firebase';

export default function useProducts() {
    const queryClient = useQueryClient();

    const productsGetQuery = useQuery(['products'], fetchProducts, {staleTime: 1000 * 60})

    const productsAddQuery = useMutation(({product, url}) => uploadProduct(product, url), 
    {
    onSuccess: () => queryClient.invalidateQueries(['products'])
    }
    );
  return {productsGetQuery, productsAddQuery}
}