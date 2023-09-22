import ImageResizer from '@bam.tech/react-native-image-resizer';
import {useColorScheme} from 'react-native';

export const checkErrorContatrainsArrays = (errors: any[]): any => {
  return errors.flatMap(error => Object.values(error.constraints ?? []))[0]; // Use flatMap and nullish coalescing operator
};

export const fazerSubtotal = (preco: number, quantidade: number): number => {
  return preco * quantidade;
};

export const taxaServico = (subtotal: number, taxa: number) => {
  return subtotal * (taxa / 100);
};

export const total_iva = (
  subtotal: number,
  taxa_servico: number,
  taxa_entrega: number,
  imposto: number,
) => {
  const total = Number(
    Number(subtotal) + Number(taxa_servico) + Number(taxa_entrega),
  );
  const iva = total * (imposto / 100);
  return iva; //iva;
};

export const extrairTipoDeImagem = (arquivo: string) => {
  return arquivo.substring(0, arquivo.indexOf('/'));
};

// export const getLogo = () => {
//   const theme = useColorScheme();
//   if (theme === 'light') {
//     return require('../assets/image/logo.png');
//   } else {
//     return require('../assets/image/logo-dark.png');
//   }
// };

interface ResizedImage {
  uri: string;
  width: number;
  height: number;
}

export const resizeImage = async (
  sourceURI: string,
  targetWidth: number,
  targetHeight: number,
  quality = 80,
  resizeMode = true,
): Promise<ResizedImage> => {
  try {
    const resizedImage = await ImageResizer.createResizedImage(
      sourceURI,
      targetWidth,
      targetHeight,
      'PNG',
      quality,
      0, // No rotation
      undefined, // Output file path (null means it will generate a temp file)
      resizeMode,
    );

    return {
      uri: resizedImage.uri,
      width: resizedImage.width,
      height: resizedImage.height,
    };
  } catch (error) {
    console.error('Error resizing image:', error);
    throw new Error('Image resize failed');
  }
};

export const limparObjeto = (obj: any): void => {
  if (obj === null || typeof obj !== 'object') {
    return;
  }

  if (Array.isArray(obj)) {
    obj.length = 0; // Limpa o array
  } else {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        limparObjeto(obj[prop]); // Chama a função recursivamente para as propriedades do objeto
        obj[prop] = Array.isArray(obj[prop]) ? [] : null; // Define a propriedade como [] se for array, caso contrário, nulo
      }
    }
  }
};
