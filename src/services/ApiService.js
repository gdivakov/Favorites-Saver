// @flow
export default class ApiService {
  static async fetch(url) {
    const options = {
      method: 'GET',
    };

    if (!url) return;

    const resp = await fetch(url, options);
    return await ApiService.parseResponse(resp);
  }

  static async parseResponse(res) {
    if (res.status !== 200) {
      // Error handling
      return;
    }
    return await res.json();
  }
}