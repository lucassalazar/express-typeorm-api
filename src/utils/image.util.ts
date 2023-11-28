import config from "@/config";

export default class ImageUtil {
  static prepareUrl(resource: string, imageId: string): string {
    return `${config.APP_URL}:${config.APP_PORT}/images/${resource}/${imageId}`;
  }
}
