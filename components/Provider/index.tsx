"use client";
import { Next13ProgressBar } from "next13-progressbar";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

interface Props {
    children: React.ReactNode;
}

export default function Provider({ children }: Props) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    return (
        <>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
            <Next13ProgressBar
                height='4px'
                color='#8B4513'
                options={{ showSpinner: true }}
                showOnShallow
            />
        </>
    );
}
