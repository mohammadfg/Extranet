import Lottie from 'react-lottie-player'
import errorAnimation from '../assets/animations/error.json'

export default function Error({ message }: { message: string }) {
    return (
        <div className="text-center">
            <Lottie
                loop
                animationData={errorAnimation}
                play
                style={{ width: "100%", height: 150 }}
            />
            <div>{message}</div>
        </div>
    )
}
