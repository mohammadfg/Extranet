import Lottie from 'react-lottie-player'
// export function Loading({ message = "" }: { message?: string }) {
//     return (
//         <div className="w-72 h-72 grid place-items-center bg-[#000000e3]">
//             <img src="./assets/icons/wait_32.gif" alt="Loading ..." loading="lazy" />
//             <h3 className="text-white">{message}</h3>
//         </div>
//     );
// }
export default function Error({ message }: { message: string }) {
    return (
        <div className="text-center">
            <Lottie
                loop
                animationData="./assets/animations/Error.json"
                play
                style={{ width: "100%", height: 150 }}
            />
            <div>{message}</div>
        </div>
    )
}
