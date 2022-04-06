function tokenAuth(token) {
  return {
    type: "GET_TOKEN",
    payload: token,
  };
}

export { tokenAuth };
