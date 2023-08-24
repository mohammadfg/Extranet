import Lottie from 'react-lottie-player/dist/LottiePlayerLight'
import error from '../assets/animations/Error.json'
import loading from '../assets/animations/loading.json'
export default function Message({ message = "", anime = "loading" }: { message: string, anime: "loading" | "error" }) {
    const animations = {
        loading: loading,
        error: error
    }
    return (
        <div className="text-center">
            <Lottie
                loop
                animationData={animations[anime]}
                play
                style={{ width: "100%", height: 150 }}
            />
            <div>{message}</div>
        </div>
    )
}
