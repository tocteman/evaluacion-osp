import fetch from 'node-fetch';

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  const usersUrl = `${identity.url}/admin/users`;
  const adminAuthHeader = 'Bearer ' + identity.token;

  try {
    return fetch(usersUrl, {
      method: 'GET',
      headers: { Authorization: adminAuthHeader },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', JSON.stringify(data));
        return { statusCode: 204 };
      })
      .catch((e) => {
        return {
          statusCode: 500,
          body: 'Internal Server Error: ' + e,
        };
      });
  } catch (e) {
    return e;
  }
};