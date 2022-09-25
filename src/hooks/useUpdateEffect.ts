import { DependencyList, EffectCallback, useEffect, useRef } from "react"

function isFirstRender() {
    const isFirst = useRef(true)
    if (isFirst.current) {
        isFirst.current = false
        return true
    }
    return isFirst.current
}


export function useUpdateEffect(effect: EffectCallback, deps: DependencyList) {
    const isFirst = isFirstRender()
    useEffect(() => {
        if (!isFirst) return effect()
    }, deps)
}
