import { Injectable } from "@nestjs/common";
import { MinioClientService } from "./minio-client.service";

@Injectable()
export class EnvioDeArquivoMinioService {
  private readonly bucketName = process.env.MINIO_BUCKET_NAME;
  private readonly isDevelopment = process.env.NODE_ENV === "development";

  constructor(private readonly minioClient: MinioClientService) {}

  public async enviar(file: Express.Multer.File) {
    const timestamp = Date.now().toString();
    // const extension = file.originalname.substring(
    //   file.originalname.lastIndexOf('.'),
    //   file.originalname.length,
    // );

    // We need to append the extension at the end otherwise Minio will save it as a generic file
    // const fileName = timestamp + extension;
    const fileName = `${timestamp}-${file.originalname}`;

    const metaData = {
      "Content-Type": file.mimetype,
    };

    await this.minioClient.upload(
      this.bucketName,
      fileName,
      file.buffer,
      metaData,
    );

    const protocol = this.isDevelopment ? "http://" : "https://";

    const url = `${protocol}${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${fileName}`;

    return { url };
  }
}
