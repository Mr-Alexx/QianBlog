const status = {
  // comment
  1001: {
    code: 1001,
    message: 'Success!'
  },
  1002: {
    code: 1002,
    message: 'Failed!'
  },
  // file upload
  2001: {
    code: 2001,
    message: 'Upload success!'
  },
  2002: {
    code: 2002,
    message: 'Upload failed'
  },
  2003: {
    code: 2003,
    message: 'Upload failed, file type is not allowed!'
  },
  2004: {
    code: 2004,
    message: `Upload failed, file size can't exceed 2M!`
  }
}

/**
 * @return {Object} repsonse data
 */
const getRes = (code, message, data) => {
  if (!code) {
    return status[1001]
  }
  message = (message === undefined || message === '') ?
    status[code].message : message
  data = data || null
  // 此处不能使用object.assign来返回对象，会更改status对象的内容存于内存中，是的下一个返回的对象data会是前一个的data
  return {
    code,
    message,
    data
  }
}

module.exports = getRes
