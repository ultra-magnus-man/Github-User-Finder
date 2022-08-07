import React from "react";
import { useState, useContext } from "react";
import GithubContext from "../../Context/github/GithubContext";
import AlertContext from "../../Context/alert/AlertContext";

const UserSearch = () => {
  const [text, setText] = useState("");

  const { users, searchUsers, clearUsers } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  const onSumbitHandler = (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter some value", "error");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  const onClearSearchResults = () => {
    clearUsers();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={onSumbitHandler}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search for the user"
                value={text}
                onChange={onChangeHandler}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Find
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            className="btn btn-ghost btn-lg"
            onClick={onClearSearchResults}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
