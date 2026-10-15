type StorageFolder =
    | "avatar"
    | "banners"
    | "curriculums/curriculums_user_profile"
    | "curriculums/curriculums_applications";

type IStoredFile =
    | { kind: "local"; path: string }
    | { kind: "remote"; url: string };

interface IStorageProvider {
    // Recebe o arquivo já gravado pelo multer em tmp/<folder> e o move para o storage definitivo
    save(file: string, folder: StorageFolder): Promise<string>;
    delete(file: string, folder: StorageFolder): Promise<void>;
    // Duplica um arquivo já salvo em outra pasta, com um novo nome; retorna o novo nome
    copy(file: string, from: StorageFolder, to: StorageFolder): Promise<string>;
    // Retorna onde o arquivo pode ser entregue, ou null se não existir
    getFile(file: string, folder: StorageFolder): Promise<IStoredFile | null>;
}

export type { IStorageProvider, IStoredFile, StorageFolder };
