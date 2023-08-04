import axios from "axios";

export default axios.create({
    baseURL: "https://api.themoviedb.org/3",

    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTdlNDY0OTczZDU4ZTU5Nzc3N2IwMDE5Y2UwNTFmZCIsInN1YiI6IjY0OTgxODFkOTU1YzY1MDE0NDRkZGU5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._aZiABWvCFDkwdw_s6xgXXhsm6LNsQujuX40I-vzk4Q",
    },
});
