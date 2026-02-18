import { Suspense } from "react"

export const SuspenseWrapper = ({ children }) => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            {children}
        </Suspense>
    )
}