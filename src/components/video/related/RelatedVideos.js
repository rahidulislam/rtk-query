import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({id, title}) {
    const {data:videos,isLoading, isError, error}=useGetRelatedVideosQuery({id, title});
    //decide what to render
    let content = null;
    if(isLoading){
        content = <><RelatedVideoLoader/><RelatedVideoLoader/><RelatedVideoLoader/></>
    }
    if(!isLoading && isError){
        content = <Error message={error}/>
    }
    if(!isLoading && !isError && videos?.length === 0){
        content = <Error message="No related videos found"/>
    }
    if(!isLoading && !isError && videos?.length > 0){
        content = videos.map((video) => {
            return <RelatedVideo key={video.id} video={video}/>
        })
    }
    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
