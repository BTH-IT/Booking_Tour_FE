import { API_URL } from '@/constants/endpoints';

import configService from './ConfigService';
import { ApiResponse } from 'index';

const uploadService = {
  async uploadMultipleFileWithAWS3(
    files: File[],
  ): Promise<{ url: string; name: string; type: string }[]> {
    const formData = new FormData();

    // Append each file to the form data
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res: ApiResponse<{ url: string; name: string; type: string }[]> =
        await configService.post(`${API_URL.UPLOADS}/multiple`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      return res.result; // Assuming the response contains the URL in res.data.url
    } catch (error) {
      console.error('Error uploading file:', error);
      return [];
    }
  },
};

export default uploadService;
