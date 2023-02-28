import SadIcon from "./icons/SadIcon"

export default function Error() {
    return (
        <div className="text-center mt-8 max-w-xl m-auto">
            <div className="flex gap-3 justify-center items-center">
                <h2 className="font-semibold text-3xl text-zinc-600 whitespace-nowrap">
                    Error 500!
                </h2>
                <SadIcon className="stroke-zinc-600 w-12 h-12" />
            </div>
            <p className="text-zinc-500 text-2xl font-medium">
                Desculpe, tivemos um problema em nossos sistemas. Em breve estaremos de volta.
            </p>
        </div>
    )
}
