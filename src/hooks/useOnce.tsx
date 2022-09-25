import { useEffect, useRef } from "react";

export function useOnce(handle: Function, dep: any[] = []) {
    const firstRef = useRef(true)
    const loadedRef = useRef(false)

    useEffect(
        () => {
            if (dep.length) {
                if (firstRef.current) {
                    handle()
                    firstRef.current = false
                }
            } else {
                if (loadedRef.current) {
                    handle()
                    firstRef.current = false
                } else {
                    loadedRef.current = true
                }
            }
        },
        dep
    )
}