const API_ROOT = process.env.NEXT_PUBLIC_API_URL;

const API = {
  AUTH: {
    LOGIN: `${API_ROOT}/accounts/login/`,
    SIGNUP: `${API_ROOT}/accounts/register/phone/`,
    ACCOUNT_INFO: `${API_ROOT}/accounts/me/`,
    TOKEN_REFRESH: `${API_ROOT}/accounts/token/refresh/`,
    LIST_USER: `${API_ROOT}/accounts/user/`,
  },
  ROOM: {
    LIST_ROOM: `${API_ROOT}/accounts/rooms/`,
  },
  MESSAGE: {
    LIST_MESSAGES: `${API_ROOT}/accounts/messages/`,
    LIST_DIRECT_MESSAGES: `${API_ROOT}/accounts/direct_messages/`,
  },
  FRIENDSHIP: {
    REQUEST_FRIEND: `${API_ROOT}/accounts/friendship/`,
    FRIENDS_LIST: `${API_ROOT}/accounts/friendship/friends_list/`,
  },
  CLASS: {
    LEVELS: `${API_ROOT}/accounts/class_level/`,
    NAMES: `${API_ROOT}/accounts/class_name/`,
    CREATE_LEVEL: `${API_ROOT}/accounts/class_levels/create/`, // Endpoint tạo mới khối lớp
    CREATE_NAME: `${API_ROOT}/accounts/class_names/create/`, // Endpoint tạo mới lớp học
  },};

export default API;
