import ImageResizer from '@bam.tech/react-native-image-resizer';
import {useColorScheme} from 'react-native';

export const checkErrorContatrainsArrays = (errors: any[]): any => {
  return errors.flatMap(error => Object.values(error.constraints ?? []))[0]; // Use flatMap and nullish coalescing operator
};

export const fazerSubtotal = (preco: number, quantidade: number): number => {
  return preco * quantidade;
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

/* export const compressImage = async (uri: string) => {
  const manipImage = await ImageManipulator.default.manipulate(uri, [], {
    compress: 0.3,
  });
  return manipImage;
};

export const fetchAndCompressImage = async (apiUrl: string) => {
  try {
    // Fetch the image from the external API using Axios
    const response = await axios.get(apiUrl, {responseType: 'blob'});

    // Check if the Axios response is successful
    if (response.status !== 200) {
      throw new Error('Failed to fetch the image');
    }

    // Create a BlobOptions object with the required lastModified property
    const blobOptions = {
      type: response.headers['content-type'],
      lastModified: Date.now(),
    };

    // Create a blob with the BlobOptions
    const imageBlob = new Blob([response.data], blobOptions);

    const imageUri = URL.createObjectURL(imageBlob);

    // Compress the fetched image using your utility function
    const compressedImage = await compressImage(imageUri);

    // `compressedImage` now contains the compressed image data
    console.log('Compressed Image:', compressedImage);

    // You can do further processing or display the compressed image as needed

    // Don't forget to release the blob URL to free up memory
    URL.revokeObjectURL(imageUri);
  } catch (error) {
    console.error('Error:', error);
  }
};
 */
