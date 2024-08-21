import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { MinioService } from "nestjs-minio-client";

@Injectable()
export class MinioClientService {
  private readonly logger = new Logger(MinioClientService.name);

  constructor(private readonly minio: MinioService) {}

  private get client() {
    return this.minio.client;
  }

  public async upload(
    bucketName: string,
    fileName: string,
    buffer: Buffer,
    metaData: object,
  ) {
    try {
      await this.client.putObject(bucketName, fileName, buffer, metaData);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException("Erro no upload do arquivo.");
    }
  }

  public async delete(bucketName: string, objectName: string) {
    try {
      await this.client.removeObject(bucketName, objectName);
    } catch (error) {
      throw new BadRequestException("Erro ao deletar arquivo.");
    }
  }

  public async listObjects(bucketName: string): Promise<string[]> {
    try {
      // Utilize o método listObjects do cliente MinIO para listar os objetos no bucket
      const stream = this.client.listObjectsV2(bucketName);

      // Inicialize um array para armazenar os nomes dos arquivos encontrados
      const objects: string[] = [];

      // Itere sobre os objetos retornados e adicione seus nomes ao array
      for await (const obj of stream) {
        objects.push(obj.name);
      }

      // Retorne o array com os nomes dos arquivos
      return objects;
    } catch (error) {
      // Em caso de erro, lance uma exceção BadRequestException
      throw new BadRequestException("Erro ao buscar arquivos.");
    }
  }
}
