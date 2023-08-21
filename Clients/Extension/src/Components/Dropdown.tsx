import type { Dropdown } from "../Types/Global";

export default function Dorpdown({ visibility, animations = "scale", children, callbackEvent, closer = true }: Dropdown) {
    // why in this place we don't use state ?
    const selfData = {
        animations: {
            slide: {
                Up: "animate-[moveDowntoUp_0.5s_1] top-1",
                Down: "animate-[moveUptoDown_0.5s_1] top-full invisible",
            },
            scale: {
                Up: "animate-[scaleUp_0.5s_1]",
                Down: "animate-[scaleDown_0.5s_1] invisible",
            },
        },
        visibility: true,
    };
    return (
        <div
            className={
                "shadow-xl dark:bg-slate-950 rounded-t-md dark:text-white p-1 absolute w-[95%] bg-white z-[2] h-full justify-self-center " +
                (visibility
                    ? selfData.animations[animations].Up
                    : selfData.animations[animations].Down)
            }
        >
            {
                closer && (<button
                    className="text-red-700 p-2 pb-0 text-2xl font-medium"
                    onClick={() => {
                        // callbackEvent({ visibility: false });
                        callbackEvent(false);
                    }}
                >
                    X
                </button>)
            }
            {children}
        </div>
    );
}
