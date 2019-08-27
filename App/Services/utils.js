import Permissions from "react-native-permissions";
// import Bluebird from "bluebird";

const sufixes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

const getBytes = bytes => {
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (!bytes && "0 Bytes") ||
    (bytes / Math.pow(1024, i)).toFixed(2) + " " + sufixes[i]
  );
};

const previewText = input => input.replace(/(\r\n|\n|\r|\\n)/gm, " ");

/**
 * Permissions
 */

const requestCameraPermission = (title, message) => {
  return new Promise(async (resolve, reject) => {
    Permissions.request("camera", {
      rationale: {
        title: title,
        message: message
      }
    })
      .then(response => {
        if (response === "authorized") resolve(response);
        else reject(response);
      })
      .catch(err => reject(err));
  });
};

const requestPhonePermission = (title, message) => {
  return new Promise(async (resolve, reject) => {
    Permissions.request("callPhone", {
      rationale: {
        title: title,
        message: message
      }
    })
      .then(response => {
        if (response === "authorized") resolve(response);
        else reject(response);
      })
      .catch(err => reject(err));
  });
};

const requestCalendarPermission = (title, message) => {
  return new Promise(async (resolve, reject) => {
    Permissions.request("event", {
      rationale: {
        title: title,
        message: message
      }
    })
      .then(response => {
        if (response === "authorized") resolve(response);
        else reject(response);
      })
      .catch(err => reject(err));
  });
};

const buildString = (str1, str2, separator = ", ") => {
  if (!str1 && !str2) return "N/A";
  else if (!str1) return str2;
  else if (!str2) return str1;
  else return str1 + separator + str2;
};

const truncate = (input, size = 20) =>
  input.length > size ? `${input.substring(0, size)}...` : input;

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export {
  buildString,
  truncate,
  capitalizeFirstLetter,
  requestCameraPermission,
  requestCalendarPermission,
  requestPhonePermission,
  getBytes,
  previewText
};
