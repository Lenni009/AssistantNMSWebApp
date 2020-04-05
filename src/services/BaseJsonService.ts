import axios from 'axios';
import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { anyObject } from '../helper/TypescriptHacks';
import { Guide } from '../contracts/guide/guide';

export class BaseJsonService {
  protected async getAsset<T>(url: string): Promise<ResultWithValue<T>> {
    try {
      const result = await axios.request<T>({
        url: `/assets/${url}`
        // url: `https://raw.githubusercontent.com/NoMansSkyAssistant/Languages/master/${url}`
      });
      return {
        isSuccess: true,
        value: result.data,
        errorMessage: ''
      }
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex.message
      }
    }
  }

  protected async getJsonGuide(guideFolder: string, jsonFileName: string): Promise<Guide> {
    return await this.getJsonFromAssets<Guide>(`guide/${guideFolder}/${jsonFileName}`);
  }

  protected async getJsonFromAssets<T>(jsonFileName: string) {
    var jsonString = await axios.request<T>({
      url: `/assets/${jsonFileName}.json`
    });
    return jsonString.data;
  }
}
