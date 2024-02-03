import { development, production, testing } from 'src/environment/environment';

export class baseUrl {
  _apiUrl() {
    return development.apiURL;
  }
}
