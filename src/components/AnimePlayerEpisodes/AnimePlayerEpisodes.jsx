import { useState } from "react";
import AnimeEpisodes from "../AnimeEpisodes/AnimeEpisodes";
import AnimePlayer from "../AnimePlayer/AnimePlayer";
import { useParams } from "react-router-dom";
import {
  useGetAnimeAniEpisodesQuery,
  useGetAnimeDetailByMalIdQuery,
} from "../../redux/Query/apiEndpoints";
import { useSelector } from "react-redux";

const AnimePlayerEpisodes = () => {
  const [currentEpisode, setCurrentEpisode] = useState();
  let params = useParams();
  const animeID = params.id;
  console.log(params.id);
  const animeInfo = useGetAnimeDetailByMalIdQuery(animeID);
  const page = useSelector((state) => state.pageNumber.pageNo);

  console.log(animeInfo?.data);
  const animeEpisodes = useGetAnimeAniEpisodesQuery(
    { id: animeInfo.data?.data?.documents?.[0]?.id, dub: false, page: page },
    {
      skip: !animeInfo.isSuccess,
    }
  );

  return (
    <>
      {currentEpisode && <AnimePlayer currentEpisode={currentEpisode} />}
      <AnimeEpisodes
        animeEpisodes={animeEpisodes?.data}
        loading={animeEpisodes?.isLoading}
        error={animeEpisodes?.error}
        currentEpisode={currentEpisode}
        setCurrentEpisode={setCurrentEpisode}
      />
    </>
  );
};

export default AnimePlayerEpisodes;