import { useCallback, useState } from "react";

class ErrorBoundary extends Error {
    public status: number;
    constructor(message: string, status: number) {
        super();
        this.message = message;
        this.status = status;
    }
}

type ErrorState = { status: number; message: string };

const useLoading = <T, >( // VSCode thought it was JSX element, so I had to add a comma
    url: string,
    callback: (data: T[]) => void
): [string, () => void, ErrorState] => {
    const [state, setState] = useState<"pending" | "loading" | "error">(
        "pending"
    );
    const [error, setError] = useState<ErrorState>({
        status: 0,
        message: ""
    });

    const dispatch: () => void = useCallback<() => void>(async () => {
        try {
            setState("loading");
            const rawData = await fetch(url);
            if (!rawData.ok) {
                throw new ErrorBoundary(
                    "Coudn't reach " + url,
                    rawData.status
                );
            }
            const data = await rawData.json();
            setState("pending");
            callback(data);
        } catch (error) {
            setState("error");
            if (typeof error === "string")
                setError({ status: 404, message: error });
            else if (error instanceof ErrorBoundary)
                setError({ status: error.status, message: error.message });
        }
    }, [callback, url]);

    return [state, dispatch, error];
};

export default useLoading;
