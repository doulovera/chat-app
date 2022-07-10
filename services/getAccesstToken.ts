export const getAccessToken = async (token: string) => {
  const response = await fetch('/api/get-access-token', {
    method: 'GET',
    headers: {
      jwt: token,
    },
  });

  if (!response.ok) throw new Error('Failed to get access token');

  const data = await response.json();
  const { accessToken } = data;

  return accessToken;
};
