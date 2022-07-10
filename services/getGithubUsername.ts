export const getGithubUsername = async (userId: string) => {
  const response = await fetch(`https://api.github.com/user/${userId}`);
  const { login: username } = await response.json();
  return username;
};
