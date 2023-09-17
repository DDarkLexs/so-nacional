export const checkErrorContatrainsArrays = (errors: any[]): any => {
  return errors.flatMap(error => Object.values(error.constraints ?? []))[0]; // Use flatMap and nullish coalescing operator
};

export const fazerSubtotal = (preco: number, quantidade: number): number => {
  return preco * quantidade;
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
