const request = require('request')
const fs = require('fs')
const baseUrl = 'https://api.mlwei.com/music/api/wy/'

module.exports = function (ctx, next) {
  return async function (ctx, next) {
    const params = {
      key: '523077333',
      id: '2796359205', // 歌单id
      type: 'songlist'
    }
    try {
      request(`${baseUrl}?key=${params.key}&id=${params.id}&type=${params.type}`, (err, res, data) => {
        console.log(data)
        if (err) {
          console.log(err)
        } else {
          fs.readFile('../utils/music.json', (err, data) => {
            if (!data) {
              fs.writeFile('../utils/music.json', (err) => {
                if (err) {
                  console.log(err)
                } else {
                  console.log('Music list download is done.')
                }
              })
            }
          })
        }
      })
      await next()
    } catch (err) {
      console.log(err)
    }
  }
}

