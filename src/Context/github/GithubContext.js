import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Clear users from state
  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS" });
  };

  //Search users
  const searchUsers = async (text) => {
    //To get the initial loading for the users
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();

    // setUsers(data);
    dispatch({ type: "GET_USERS", payload: items });
    // setLoading(false);

    console.log(items);
  };
  //Get single user
  const getSingleUser = async (login) => {
    //To get the initial loading for the users
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      // setUsers(data);
      dispatch({ type: "GET_USER", payload: data });
      // setLoading(false);
    }
  };
  //Get user repos
  const getUserRepos = async (login) => {
    //To get the initial loading for the users
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      pre_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    // setUsers(data);
    dispatch({ type: "GET_REPOS", payload: data });
    // setLoading(false);
  };

  //Function for SetLoading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers,
        clearUsers,
        getSingleUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
