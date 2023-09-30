import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import eventBus from 'eventBus';

/**
 * Represents the shape of an ErrorResponse.
 */
type ErrorResponse = {
  isError: true;
  id: string;
} & Partial<AxiosError>;

/**
 * Represents the shape of an API configuration object.
 * @template T - The type of data expected in the response.
 */
type ApiConfig<T> = AxiosRequestConfig & {
  id: string;
  fallback?: T;
};

// The base URL for API requests, falls back to a default value if not provided in process.env.
const API_BASE_URL = process.env.API_BASE_URL || 'https://www.example.com/api/v1';

/**
 * Creates an error object with optional message, ID, and AxiosError properties.
 * @param {string} message - The error message.
 * @param {string} [id] - An optional unique identifier for the error.
 * @param {Partial<AxiosError>} [e] - An optional AxiosError object.
 * @returns {ErrorResponse} - The error response object.
 */
const createError = (message: string, id?: string, e?: Partial<AxiosError>): ErrorResponse => {
  const error = { isError: true, message: message, id: id || 'must be fileName.functionName.uniqueNumber', ...(e || {}) };
  console.error(error);
  return error;
};

/**
 * Validates an API configuration object to ensure it meets certain criteria.
 * @template T - The type of data expected in the response.
 * @param {ApiConfig<T>} config - The API configuration object to validate.
 * @returns {ErrorResponse | null} - An error response if validation fails, or null if valid.
 */
const validateConfig = <T>(config: ApiConfig<T>): ErrorResponse | null => {
  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    return createError('DevError: Invalid config object', config?.id);
  }

  if (!config.id || typeof config.id !== 'string' || config.id.split('.').length !== 3) {
    return createError('DevError: Invalid config.id', config.id);
  }

  if (!config.url || typeof config.url !== 'string' || config.url.trim() === '') {
    return createError('DevError: Invalid config.url', config.id);
  }

  return null;
};

/**
 * Handles Axios errors, emits an 'unauthorized' event for 401 errors, and creates an ErrorResponse.
 * @param {Partial<AxiosError>} e - The Error object.
 * @param {ApiConfig<any>} config - The API configuration object.
 * @returns {ErrorResponse} - The error response object.
 */
const handleAxiosError = (e: Partial<AxiosError>, config: ApiConfig<any>): ErrorResponse => {
  if (e?.response?.status === 401) eventBus.emit('unauthorized');
  return createError('', config.id, e);
};

/**
 * Makes an asynchronous API call using Axios.
 * @template T - The type of data expected in the response.
 * @param {ApiConfig<T>} config - The API configuration object.
 * @returns {Promise<T | ErrorResponse>} - A promise that resolves to the fallback or an ErrorResponse.
 * @example
 * // Send a GET request to retrieve user data.
 * const response = await call({
 *   id: 'example.call.0',
 *   url: '/users',
 * });
 *
 * // Handle the response or error:
 * if (response.isError) {
 *   // When no fallback is provided, an ErrorResponse is returned.
 *   // Errors are automatically logged so you only need to show a user friendly error on the ui.
 *   // Never show the technical status code or error on screen.
 * } else if (response === fallback) {
 *   // When a fallback is provided and an error occurs, the fallback is returned.
 *   // Errors are automatically logged, and the response is the provided fallback.
 * } else {
 *   // When no error occurs, the API response is returned.
 *   // Handle success as needed. It's recommended to handle fallbacks similarly for a seamless user experience.
 * }
 */
const call = async <T>(config: ApiConfig<T>): Promise<T | ErrorResponse> => {
  const validationError = validateConfig(config);
  if (validationError) {
    if (typeof config.fallback === undefined) {
      return validationError;
    }
    return config.fallback 
  }

  try {
    const response: AxiosResponse<T> = await axios({
      ...config,
      method: config.method || 'GET',
      // Construct the full API URL by combining the base URL and encoding the URL path.
      url: `${API_BASE_URL}/${encodeURI(config.url.replace(/\s+/g, ' '))}`,
    });

    // The response is guaranteed, so the optional operator (?) is not needed.
    console.debug({ config, response: response.data });

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      // Log the error and return the expected data
      const axiosError = handleAxiosError(e, config);
      if (typeof config.fallback === undefined) {
        return axiosError;
      }
      return config.fallback 
    }

    // Log the error and return the expected data
    const error = createError('An unexpected error occurred.', config.id, e)
    if (typeof config.fallback === undefined) {
      return error;
    }
    return config.fallback;
  }
};

export default call;
