"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface CalEmbedProps {
    calLink: string; // e.g. "coffeeshotit/wedding-photography"
}

export default function CalEmbed({ calLink }: CalEmbedProps) {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: calLink });
            cal("ui", {
                theme: "dark",
                hideEventTypeDetails: false,
                layout: "month_view",
                cssVarsPerTheme: {
                    dark: {
                        "cal-brand": "#f59e0b",
                        "cal-bg": "#0a0a0a",
                        "cal-bg-emphasis": "#111111",
                        "cal-border": "rgba(255,255,255,0.08)",
                        "cal-border-emphasis": "rgba(255,255,255,0.15)",
                        "cal-text": "#ffffff",
                        "cal-text-emphasis": "#ffffff",
                        "cal-text-subtle": "rgba(255,255,255,0.4)",
                    },
                    light: {
                        "cal-brand": "#f59e0b",
                        "cal-bg": "#0a0a0a",
                        "cal-bg-emphasis": "#111111",
                        "cal-border": "rgba(255,255,255,0.08)",
                        "cal-border-emphasis": "rgba(255,255,255,0.15)",
                        "cal-text": "#ffffff",
                        "cal-text-emphasis": "#ffffff",
                        "cal-text-subtle": "rgba(255,255,255,0.4)",
                    },
                },
            });
        })();
    }, [calLink]);

    return (
        <Cal
            namespace={calLink}
            calLink={calLink}
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "dark" }}
        />
    );
}