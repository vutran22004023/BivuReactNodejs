import {useMutation} from '@tanstack/react-query'
import { useState,useEffect } from 'react'
const useMutationHooks = (fnCallBack) => {
    const mutation =   useMutation({
        mutationFn: fnCallBack
    })
      return mutation
}
const useDebounce = (value, delay) => {
    const [valueDebounce, setValueDebounce] = useState()
    useEffect(() => {
        const handle = setTimeout(() => {
            setValueDebounce(value)
        },[delay])
        return () => {
            clearTimeout(handle)
        }
    },[value])
    return valueDebounce
}
export {
    useMutationHooks,
    useDebounce
}
