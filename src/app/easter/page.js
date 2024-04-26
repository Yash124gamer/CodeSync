import Image from "next/image"
import goku from "./goku.gif";

export default function Page() {

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <Image
                    src={goku}
                />
            </div>
        </div>
    )

}