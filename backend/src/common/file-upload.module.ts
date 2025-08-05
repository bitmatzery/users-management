// file-upload.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Папка для хранения файлов
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4(); // Генерация уникального имени файла
          const fileExt = extname(file.originalname); // Получение расширения файла
          cb(null, `${uniqueSuffix}${fileExt}`); // Сохранение файла с уникальным именем
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // Максимальный размер файла 10 МБ
      },
    }),
  ],
})
export class FileUploadModule {}
