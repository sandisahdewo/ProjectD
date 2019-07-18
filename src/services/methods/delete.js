import axios from 'axios'
import {RootPath} from '../config/path'
import Identity from '../config/identity'

// const config = {
//   headers: {
//     'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJhYzU5ODQ4YmI1ZjUxMDNkMDA2NTdlMWEwMDhmOTc0ZDRlZWNlZTNjNTMyMzE1MGI5ZmVkYmQ4NTQwM2YzZDBjNTFiYWU5MDE0Yzk2OTQyIn0.eyJhdWQiOiIxIiwianRpIjoiYmFjNTk4NDhiYjVmNTEwM2QwMDY1N2UxYTAwOGY5NzRkNGVlY2VlM2M1MzIzMTUwYjlmZWRiZDg1NDAzZjNkMGM1MWJhZTkwMTRjOTY5NDIiLCJpYXQiOjE1NjE1NTk0MDUsIm5iZiI6MTU2MTU1OTQwNSwiZXhwIjoxNTkzMTgxODA1LCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.mm2WXwcFcXCBFwMI3jYX_P8xcbdepL22OwXykam7qh2tET668QCOSduCTGGHLwXSpcPbYlcOYQLhmox8Xp0rgbEQriWgMozfPl3YRImVKKwd-jFH03tPAvq5-o64JNsDEUKhmf15N5ahLiQez7DJCIsL-TAxU3Ce__PkEh0ToCopIZ8PyDBCDzrJijHA3KVe5mQWkRxqb8f9qMaNpX18mqvWfOJSE6JbZayqal2miqmUYJY4ZGpBfSUvHq69Mfbd57tFt4BiNrhLrHjX-lhxMBKaL9jKcA33DgxQ7UVPUGMnjGc5LxiweC-yrJvtjIjd-_Mu6Z5OsVmfwwUuqWpXUVi6rV1ejeiJeIUy5-mpnxmUAa9RAmUE_Lgx0Yxsao_YuWO7L5uRaFiBmZrH-rMRvb_OikYv2RrV-i-2m5G-CFxe6IX7Uj3_A-3EjaHBRmYKjJMW1bUdyXvJS61qPji8y6G5dphox2iNMo9nreJ7NQK8-Ca6K4BGguF6PkXVZxBDiWSASISB1rqXiVB7B0aWgEudU3iRzM9FhPRhhLIf-zQQ_YlgFIiQasHVjnwzXjf6W9LD7NhJntduhxP0FQITl0z1UrXkqN2w3Sd8FNpJ9CjZvAZqo8cfPLpgeIJmDArL4e6ZtaQXn7VrvuK-BWjcudKuaHHyvjC9FN-b54unU50'
//   }
// }

// const Delete = (path, id) => {
//   const promise = new Promise((resolve, reject) => {
//     axios.delete(`${RootPath}/${path}/${id}`, config)
//          .then(res => {
//             resolve(res.data)
//          })
//          .catch(err => {
//             reject(err)
//          })
//   })
//   return promise;
// }

const DeleteWithToken = async (path, id) => {
  let token = await Identity.getAccessToken();
  let headers = {
    headers: {
      'Authorization' : `Bearer ${token}`
    }
  }
  const promise = await new Promise((resolve, reject) => {
    axios.delete(`${RootPath}/${path}/${id}`, headers)
         .then(res => {
            resolve(res.data)
         })
         .catch(err => {
            reject(err)
         })
  })
  return promise;
}

export default DeleteWithToken;