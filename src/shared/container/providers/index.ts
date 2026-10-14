import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { DiskStorageProvider } from "./StorageProvider/implementations/DiskStorageProvider";
import { CloudinaryStorageProvider } from "./StorageProvider/implementations/CloudinaryStorageProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider,
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  process.env.STORAGE_DRIVER === "cloudinary" ? CloudinaryStorageProvider : DiskStorageProvider,
);
