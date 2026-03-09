import { MutationCache, QueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      const meta = mutation.options.meta as
        | {
            skipGlobalSuccessToast?: boolean;
            successToast?: { title?: string; description?: string };
          }
        | undefined;

      if (meta?.skipGlobalSuccessToast) return;

      toast({
        variant: 'success',
        title: meta?.successToast?.title ?? 'Sucesso',
        description: meta?.successToast?.description ?? 'Operação realizada com sucesso.',
      });
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});
