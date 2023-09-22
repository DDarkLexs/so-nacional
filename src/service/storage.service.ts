import {ReduceImageData} from '../@types/utils/utils';
import {Utilizador} from '../@types/model/usuario.model';
import asyncStorage from '@react-native-async-storage/async-storage';

type LocalStorageUserInfo = Required<Utilizador>;

export const setUser = async (
  user: LocalStorageUserInfo,
): Promise<LocalStorageUserInfo> => {
  await asyncStorage.setItem('Utilizador', JSON.stringify(user));
  return await getUser();
};

export const getUser = (): Promise<LocalStorageUserInfo> => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await asyncStorage.getItem('Utilizador');
      const user: LocalStorageUserInfo = JSON.parse(String(item));
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

export const removeUser = async (): Promise<boolean> => {
  await asyncStorage.removeItem('Utilizador');
  return true;
};

export const saveImageUri = async (label: string, data: ReduceImageData) => {
  return new Promise(async (resolve, reject):Promise<void> => {
    try {
      await asyncStorage.setItem(label, JSON.stringify(data));
      // console.log('saved');
      resolve(null);
    } catch (error) {
      reject(error);
    }
  });
};

export const getImageUri = (label: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const storedImageUris = await asyncStorage.getItem(label);
      // await asyncStorage.removeItem(label);

      resolve(JSON.parse(String(storedImageUris)));
    } catch (error) {
      reject(error);
    }
  });
};

export const saveImageUriString = async (label: string, data: string) => {
  return new Promise(async (resolve, reject):Promise<void> => {
    try {
      await asyncStorage.setItem(label, data);
      // console.log('saved');
      resolve(null);
    } catch (error) {
      reject(error);
    }
  });
};

export const getImageUriString = (label: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const storedImageUris = await asyncStorage.getItem(label);
      // await asyncStorage.removeItem(label);

      resolve(JSON.parse(String(storedImageUris)));
    } catch (error) {
      reject(error);
    }
  });
};
