import api from "../../api/movies";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../providers/context";

import Select from "react-select";
import ReactSlider from "react-slider";

import { useSearchParams } from "react-router-dom";

const Filter = ({
    setSort,
    setPagee,
    setMovies,
    setGenres,
    setVoteCount,
    setRuntime,
    setUserScore,
    type,
    urlQuery,
}) => {
    // url-params
    let [searchParams, setSearchParams] = useSearchParams();

    const [error, setError] = useState("");
    const [genresList, setGenresList] = useState([]);
    const [isLoadingGenres, setIsLoadingGenres] = useState(true);
    const [isChanges, setIsChanges] = useState(false);

    const { language } = useContext(AppContext).state;

    // filter const
    const [sortFilt, setSortFilt] = useState(
        searchParams.get("sort_by") || "popularity.desc"
    );
    const [genresFilt, setGenresFilt] = useState(
        searchParams.get("with_genres")?.split(",").map(Number) || []
    );
    const [voteCountFilt, setVoteCountFilt] = useState({
        lte: searchParams.get("vote_count.lte") || null,
        gte: searchParams.get("vote_count.gte") || null,
    });
    const [runtimeFilt, setRuntimeFilt] = useState({
        lte: searchParams.get("with_runtime.lte") || null,
        gte: searchParams.get("with_runtime.gte") || null,
    });
    const [userScoreFilt, setUserScoreFilt] = useState({
        lte: searchParams.get("vote_average.lte") || null,
        gte: searchParams.get("vote_average.gte") || null,
    });

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setIsLoadingGenres(true);
                const response = await api.get(
                    `/genre/${type}/list?language=${language.toLowerCase()}`
                );

                if (response.data.genres[0].name) {
                    setGenresList(response.data.genres);
                } else {
                    const response = await api.get(
                        `/genre/${type}/list?language=en`
                    );
                    setGenresList(response.data.genres);
                }
                setError("");
            } catch (error) {
                setError(error);
            } finally {
                setIsLoadingGenres(false);
            }
        };

        console.log(genresFilt);
        fetchGenres();
    }, [setGenresList, language, type]);

    // useEffect(() => {
    //     // setPagee(0);
    //     // setMovies([]);

    //     setGenresFilt([]);
    //     setSortFilt("popularity.desc");
    //     setVoteCountFilt({
    //         lte: null,
    //         gte: null,
    //     });
    //     setRuntimeFilt({
    //         lte: null,
    //         gte: null,
    //     });
    //     setUserScoreFilt({
    //         lte: null,
    //         gte: null,
    //     });
    //     setGenres([]);
    //     setSort("popularity.desc");
    //     setVoteCount({
    //         lte: null,
    //         gte: null,
    //     });
    //     setRuntime({
    //         lte: null,
    //         gte: null,
    //     });
    //     setUserScore({
    //         lte: null,
    //         gte: null,
    //     });
    // }, [language]);

    const onClick = (id) => {
        genresFilt.includes(id)
            ? setGenresFilt(genresFilt.filter((item) => item !== id))
            : setGenresFilt([...genresFilt, id]);

        setIsChanges(true);
    };

    const onSubmit = () => {
        setPagee(0);
        setMovies([]);
        setSort(sortFilt);
        setUserScore(userScoreFilt);
        setGenres(genresFilt);
        setRuntime(runtimeFilt);
        setVoteCount(voteCountFilt);
        setIsChanges(false);
    };

    const options = [
        { value: "popularity.desc", label: "Popularity Descending" },
        { value: "popularity.asc", label: "Popularity Ascending" },
        { value: "vote_average.desc", label: "Rating Descending" },
        { value: "vote_average.asc", label: "Rating Ascending" },
        {
            value: "primary_release_date.desc",
            label: "Release Date Descending",
        },
        { value: "primary_release_date.asc", label: "Release Date Ascending" },
        { value: "title.asc", label: "Title (A-Z)" },
        { value: "title.desc", label: "Title (Z-A)" },
    ];
    return (
        <div className="main__filter filter">
            {!error && !isLoadingGenres && (
                <div className="filter__wrapper">
                    {/* <details>
                        <summary>social</summary>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                    </details> */}
                    <div className="filter__sorting">
                        <div className="filter__body">
                            <div className="filter__title">Sorting</div>

                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={options.find(
                                    (option) => option.value === sortFilt
                                )}
                                // isDisabled={isDisabled}
                                // isLoading={isLoading}
                                // isClearable={isClearable}
                                // isRtl={isRtl}
                                isSearchable={false}
                                name="color"
                                options={options}
                                onChange={(data) => {
                                    // console.log(data.value);
                                    setSortFilt(data.value);
                                    setIsChanges(true);
                                }}
                            />
                        </div>
                    </div>

                    <div className="filter__filtering">
                        <div className="filter__body">
                            <div className="filter__title">Genres</div>

                            <ul className="filter__genres-list">
                                {genresList.map((genre, index) => (
                                    <li
                                        value={genre}
                                        key={index}
                                        className={
                                            `filter__genres-item ` +
                                            (genresFilt.includes(genre.id)
                                                ? "_check"
                                                : "")
                                        }
                                        onClick={() => {
                                            onClick(genre.id);
                                        }}
                                    >
                                        {genre.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="filter__body">
                            <div className="filter__title">User Score</div>

                            <ReactSlider
                                className="horizontal-slider"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                defaultValue={[
                                    userScoreFilt.gte || 0,
                                    userScoreFilt.lte || 10,
                                ]}
                                ariaLabel={["Lower thumb", "Upper thumb"]}
                                ariaValuetext={(state) =>
                                    `Thumb value ${state.valueNow}`
                                }
                                renderThumb={(props, state) => (
                                    <div {...props}>{state.valueNow}</div>
                                )}
                                pearling
                                minDistance={1}
                                min={0}
                                max={10}
                                onChange={(value, index) => {
                                    setUserScoreFilt({
                                        gte: value[0],
                                        lte: value[1],
                                    });
                                    setIsChanges(true);
                                }}
                            />
                        </div>

                        <div className="filter__body">
                            <div className="filter__title">
                                Minimum User Votes
                            </div>

                            <ReactSlider
                                className="horizontal-slider horizontal-slider-single"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                defaultValue={voteCountFilt.gte || 0}
                                renderThumb={(props, state) => (
                                    <div {...props}>{state.valueNow}</div>
                                )}
                                min={0}
                                max={500}
                                step={10}
                                onChange={(value, index) => {
                                    setVoteCountFilt({ gte: value, lte: null });
                                    setIsChanges(true);
                                }}
                            />
                        </div>

                        <div className="filter__body">
                            <div className="filter__title">Runtime</div>

                            <ReactSlider
                                className="horizontal-slider"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                defaultValue={[
                                    runtimeFilt.gte || 0,
                                    runtimeFilt.lte || 400,
                                ]}
                                ariaLabel={["Lower thumb", "Upper thumb"]}
                                ariaValuetext={(state) =>
                                    `Thumb value ${state.valueNow}`
                                }
                                renderThumb={(props, state) => (
                                    <div {...props}>{state.valueNow}</div>
                                )}
                                pearling
                                minDistance={50}
                                min={0}
                                max={400}
                                step={10}
                                onChange={(value, index) => {
                                    setRuntimeFilt({
                                        gte: value[0],
                                        lte: value[1],
                                    });
                                    setIsChanges(true);
                                }}
                            />
                        </div>
                    </div>

                    <button
                        className="filter__btn btn btn-white-border"
                        onClick={onSubmit}
                        style={
                            isChanges
                                ? {}
                                : { opacity: 0.3, pointerEvents: "none" }
                        }
                    >
                        Apply
                    </button>

                    <button
                        className="filter__btn fixed-w100"
                        onClick={onSubmit}
                        style={
                            isChanges
                                ? {}
                                : {
                                      opacity: 0,
                                      pointerEvents: "none",
                                  }
                        }
                    >
                        Apply
                    </button>
                </div>
            )}

            {isLoadingGenres && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
        </div>
    );
};

export default Filter;
