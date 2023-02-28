//Componente utilizado em index.js
export default function DashboardLoading() {
    return (
        <div className="flex gap-3 flex-col lg:flex-row w-full">
            <div
                className="valuebox-loading w-full min-w-[230px] border flex flex-col
                border-zinc-300 h-36  rounded-md shadow-md shadow-zinc-300"
            ></div>
            <div
                className="valuebox-loading w-full min-w-[230px] border flex flex-col
                border-zinc-300 h-36  rounded-md shadow-md shadow-zinc-300"
            ></div>
            <div
                className="valuebox-loading w-full min-w-[230px] border flex flex-col
                border-zinc-300 h-36  rounded-md shadow-md shadow-zinc-300"
            ></div>
        </div>
    )
}
