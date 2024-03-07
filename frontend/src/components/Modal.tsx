"use client";
interface ModalProps {
    open: boolean,
    onClose: () => void
    title: string,
    description: string[],
}

function CloseIcon() {
    return <svg className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </svg>
}

export default function Modal({ open, onClose, title, description }: ModalProps) {

    return (
        <div
            onClick={onClose}
            className={`
                fixed inset-0 flex justify-center items-center
                transition-colors
                h-full w-full
                ${open ? "visible bg-neutral-800/80" : "invisible"}
                z-10
            `}
        >
            <div className="w-full flex justify-center">
                <div className="w-1/2 p-4 bg-neutral-950 rounded-lg shadow-md shadow-neutral-600 flex flex-col gap-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="flex justify-between border-b-2 border-white pb-2 items-center px-1"
                    >
                        <p className="text-3xl font-bold">{title}</p>
                        <button
                            onClick={onClose}
                            className="hover:scale-125 transition-all duration-150"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="flex flex-col px-2 gap-2 text-lg">
                        {description.map((line, index) => {
                            return <p key={index}>{line}</p>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )

}