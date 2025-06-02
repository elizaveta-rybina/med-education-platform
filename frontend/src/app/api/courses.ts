import axios from 'axios'

export const createCourse = async (formData: FormData) => {
  const response = await axios.post('/api/courses', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};