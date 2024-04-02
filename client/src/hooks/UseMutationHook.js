import {useMutation} from '@tanstack/react-query'

const useMutationHooks = (fnCallBack) => {
    const mutation =   useMutation({
        mutationFn: fnCallBack
    })
      return mutation
}
export {
    useMutationHooks
}