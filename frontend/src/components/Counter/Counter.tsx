"use client";
import { animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Counter({ from, to, precission, className }: { from: number, to: number, precission: number, className?: string }) {
    const nodeRef = useRef<null | HTMLParagraphElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {

        const node = nodeRef.current;
        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                    }
                })
            }, { threshold: 0.1 }
        )

        observer.observe(node);

        return () => {
            observer.unobserve(node);
        }

    }, []);

    useEffect(() => {

        if (!isInView) return;

        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(from, to, {
            duration: 1,
            onUpdate(value) {
                node.textContent = value.toFixed(precission);
            }
        })

        return () => controls.stop();

    }, [from, to, isInView])

    return <motion.p
        ref={nodeRef}
        className={className}
    > {from}</motion.p>

}